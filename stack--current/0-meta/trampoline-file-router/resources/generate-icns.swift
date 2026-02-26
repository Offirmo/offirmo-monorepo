import AppKit

let resourcesDir = FileManager.default.currentDirectoryPath
let svgPath = "\(resourcesDir)/icon.svg"
let iconsetPath = "/tmp/TrampolineFileRouter.iconset"
let icnsPath = "\(resourcesDir)/AppIcon.icns"

// Load SVG
guard let svgData = FileManager.default.contents(atPath: svgPath),
      let image = NSImage(data: svgData) else {
    print("ERROR: Could not load \(svgPath)")
    exit(1)
}

// Required icon sizes for macOS .icns
let sizes: [(String, Int)] = [
    ("icon_16x16.png", 16),
    ("icon_16x16@2x.png", 32),
    ("icon_32x32.png", 32),
    ("icon_32x32@2x.png", 64),
    ("icon_128x128.png", 128),
    ("icon_128x128@2x.png", 256),
    ("icon_256x256.png", 256),
    ("icon_256x256@2x.png", 512),
    ("icon_512x512.png", 512),
    ("icon_512x512@2x.png", 1024),
]

// Create iconset directory
try? FileManager.default.removeItem(atPath: iconsetPath)
try! FileManager.default.createDirectory(atPath: iconsetPath, withIntermediateDirectories: true)

// Render at each size
for (name, size) in sizes {
    let rep = NSBitmapImageRep(
        bitmapDataPlanes: nil,
        pixelsWide: size, pixelsHigh: size,
        bitsPerSample: 8, samplesPerPixel: 4,
        hasAlpha: true, isPlanar: false,
        colorSpaceName: .deviceRGB,
        bytesPerRow: 0, bitsPerPixel: 0
    )!
    rep.size = NSSize(width: size, height: size)

    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)
    image.draw(in: NSRect(x: 0, y: 0, width: size, height: size),
               from: .zero, operation: .copy, fraction: 1.0)
    NSGraphicsContext.restoreGraphicsState()

    let data = rep.representation(using: .png, properties: [:])!
    try! data.write(to: URL(fileURLWithPath: "\(iconsetPath)/\(name)"))
}

print("Iconset created. Converting to .icns...")

// Run iconutil
let process = Process()
process.executableURL = URL(fileURLWithPath: "/usr/bin/iconutil")
process.arguments = ["-c", "icns", iconsetPath, "-o", icnsPath]
try! process.run()
process.waitUntilExit()

if process.terminationStatus == 0 {
    print("Icon created at \(icnsPath)")
} else {
    print("ERROR: iconutil failed")
    exit(1)
}

// Clean up
try? FileManager.default.removeItem(atPath: iconsetPath)
