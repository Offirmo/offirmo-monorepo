import Cocoa

// MARK: - Configuration

struct Rule: Codable {
    let pathPrefix: String?
    let extensions: [String]?
    let app: String
}

struct Config: Codable {
    let defaultApp: String
    let rules: [Rule]
}

// MARK: - Logging

func log(_ message: String) {
    let logDir = NSHomeDirectory() + "/.config/trampoline-file-router"
    let logPath = logDir + "/trampoline-file-router.log"
    let timestamp = ISO8601DateFormatter().string(from: Date())
    let line = "[\(timestamp)] \(message)\n"

    if let handle = FileHandle(forWritingAtPath: logPath) {
        handle.seekToEndOfFile()
        handle.write(line.data(using: .utf8)!)
        handle.closeFile()
    } else {
        FileManager.default.createFile(atPath: logPath, contents: line.data(using: .utf8))
    }
}

// MARK: - Config Loading

/// Strip // and /* */ comments from JSONC so JSONDecoder can parse it.
func stripJSONComments(_ input: String) -> String {
    var result = ""
    var i = input.startIndex
    var inString = false
    var escaped = false

    while i < input.endIndex {
        let c = input[i]

        if inString {
            result.append(c)
            if escaped {
                escaped = false
            } else if c == "\\" {
                escaped = true
            } else if c == "\"" {
                inString = false
            }
            i = input.index(after: i)
            continue
        }

        if c == "\"" {
            inString = true
            result.append(c)
            i = input.index(after: i)
            continue
        }

        let next = input.index(after: i)
        if c == "/" && next < input.endIndex {
            if input[next] == "/" {
                // Line comment — skip until newline
                var j = next
                while j < input.endIndex && input[j] != "\n" {
                    j = input.index(after: j)
                }
                i = j
                continue
            } else if input[next] == "*" {
                // Block comment — skip until */
                var j = input.index(after: next)
                while j < input.endIndex {
                    let jNext = input.index(after: j)
                    if input[j] == "*" && jNext < input.endIndex && input[jNext] == "/" {
                        i = input.index(after: jNext)
                        break
                    }
                    j = input.index(after: j)
                }
                if j >= input.endIndex { i = input.endIndex }
                continue
            }
        }

        result.append(c)
        i = input.index(after: i)
    }

    return result
}

func loadConfig() -> Config {
    let configPath = NSHomeDirectory() + "/.config/trampoline-file-router/config.jsonc"
    guard let raw = FileManager.default.contents(atPath: configPath),
          let jsonc = String(data: raw, encoding: .utf8) else {
        log("Failed to read config from \(configPath), using defaults")
        return Config(defaultApp: "Cursor", rules: [])
    }
    let stripped = stripJSONComments(jsonc)
    guard let data = stripped.data(using: .utf8),
          let config = try? JSONDecoder().decode(Config.self, from: data) else {
        log("Failed to parse config from \(configPath), using defaults")
        return Config(defaultApp: "Cursor", rules: [])
    }
    return config
}

// MARK: - App Resolution

let knownBundleIds: [String: String] = [
    "cursor": "com.todesktop.230313mzl4w4u92",
    "webstorm": "com.jetbrains.WebStorm",
    "vscode": "com.microsoft.VSCode",
    "visual studio code": "com.microsoft.VSCode",
    "sublime text": "com.sublimetext.4",
    "zed": "dev.zed.Zed",
    "textmate": "com.macromates.TextMate",
    "bbedit": "com.barebones.bbedit",
    "nova": "com.panic.Nova",
    "xcode": "com.apple.dt.Xcode",
    "intellij idea": "com.jetbrains.intellij",
    "intellij": "com.jetbrains.intellij",
    "pycharm": "com.jetbrains.pycharm",
    "goland": "com.jetbrains.goland",
    "rustrover": "com.jetbrains.rustrover",
    "rider": "com.jetbrains.rider",
    "phpstorm": "com.jetbrains.PhpStorm",
    "clion": "com.jetbrains.CLion",
    "datagrip": "com.jetbrains.datagrip",
    "textedit": "com.apple.TextEdit",
]

func findAppURL(named name: String) -> URL? {
    // 1. Try known bundle IDs
    if let bundleId = knownBundleIds[name.lowercased()],
       let url = NSWorkspace.shared.urlForApplication(withBundleIdentifier: bundleId) {
        return url
    }

    // 2. Try common paths
    let paths = [
        "/Applications/\(name).app",
        NSHomeDirectory() + "/Applications/\(name).app",
    ]
    for path in paths {
        if FileManager.default.fileExists(atPath: path) {
            return URL(fileURLWithPath: path)
        }
    }

    log("WARNING: Could not find app '\(name)'")
    return nil
}

func expandHome(_ value: String) -> String {
    if value.hasPrefix("~/") {
        return NSHomeDirectory() + value.dropFirst(1)
    }
    if value.hasPrefix("$HOME/") || value.hasPrefix("$HOME") {
        return NSHomeDirectory() + value.dropFirst(5)
    }
    return value
}

func resolveApp(for path: String, config: Config) -> String {
    // First matching rule wins.
    // Both pathPrefix and extensions are optional.
    // When both are present, both must match (AND logic).
    // Put more specific rules first in the config.
    let ext = (path as NSString).pathExtension.lowercased()

    for rule in config.rules {
        let pathMatches = rule.pathPrefix.map { path.hasPrefix(expandHome($0)) } ?? true
        let extMatches = rule.extensions.map { $0.contains(ext) } ?? true

        if pathMatches && extMatches {
            return rule.app
        }
    }
    return config.defaultApp
}

// MARK: - App Delegate

class AppDelegate: NSObject, NSApplicationDelegate {
    var hasHandledURLs = false

    func application(_ application: NSApplication, open urls: [URL]) {
        hasHandledURLs = true
        let config = loadConfig()

        log("Received \(urls.count) URL(s) to open")

        // Separate file URLs from custom scheme URLs
        var fileURLsByApp: [String: [URL]] = [:]

        for url in urls {
            if url.scheme == "x-ide" {
                handleXIdeURL(url, config: config)
            } else {
                // file:// URL
                let path = url.path
                let app = resolveApp(for: path, config: config)
                log("  \(path) -> \(app)")
                fileURLsByApp[app, default: []].append(url)
            }
        }

        // Open each group of files with their target app
        for (appName, fileURLs) in fileURLsByApp {
            openFiles(urls: fileURLs, withApp: appName)
        }

        // Quit after a short delay to let the opens propagate
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
            NSApplication.shared.terminate(nil)
        }
    }

    func applicationDidFinishLaunching(_ notification: Notification) {
        DispatchQueue.main.async { [self] in
            if !hasHandledURLs {
                // Launched without files — open config directory
                log("Launched without files, opening config directory")
                let configDir = NSHomeDirectory() + "/.config/trampoline-file-router/"
                NSWorkspace.shared.open(URL(fileURLWithPath: configDir))

                DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                    NSApplication.shared.terminate(nil)
                }
            }
        }
    }

    func openFiles(urls: [URL], withApp appName: String) {
        guard let appURL = findAppURL(named: appName) else {
            let alert = NSAlert()
            alert.messageText = "TrampolineFileRouter: App Not Found"
            alert.informativeText = "Could not find application '\(appName)'.\nPlease check your config at ~/.config/trampoline-file-router/config.jsonc"
            alert.runModal()
            return
        }

        let openConfig = NSWorkspace.OpenConfiguration()
        NSWorkspace.shared.open(urls, withApplicationAt: appURL, configuration: openConfig) { _, error in
            if let error = error {
                log("ERROR opening with \(appName): \(error.localizedDescription)")
            }
        }
    }

    func handleXIdeURL(_ url: URL, config: Config) {
        // x-ide:///absolute/path/to/file?line=42&col=10
        let filePath = url.path
        let components = URLComponents(url: url, resolvingAgainstBaseURL: false)
        let line = components?.queryItems?.first(where: { $0.name == "line" })?.value
        let col = components?.queryItems?.first(where: { $0.name == "col" })?.value

        let appName = resolveApp(for: filePath, config: config)
        log("x-ide: \(filePath) -> \(appName) (line: \(line ?? "nil"), col: \(col ?? "nil"))")

        // For now, open the file with the resolved app.
        // Line/col support can be added per-app later (each IDE has different CLI flags).
        let fileURL = URL(fileURLWithPath: filePath)
        openFiles(urls: [fileURL], withApp: appName)
    }
}

// MARK: - Entry Point

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.run()
