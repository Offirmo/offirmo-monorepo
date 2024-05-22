//import { is_loaded_from_cordova } from './cordova' TODO

const URLⵧCANONICAL = 'https://www.online-adventur.es/apps/the-boring-rpg/'

/////////////////////////////////////////////////

// prod = full security and reliability
// staging = close to prod, usually only difference is the data storage = different from prod
// dev = anything else
const CHANNEL = ((): 'prod' | 'staging' | 'dev' => {

	// first weed out obvious dev cases
	if (!window.isSecureContext)                  return 'dev'
	if (window.location.protocol !== 'https:')    return 'dev'
	if (window.location.port)                     return 'dev'

	// then detect common "local" dev setups
	const isꓽlocalhost = ['localhost', 'example', 'test', 'invalid'].some(domain => window.location.hostname.endsWith(domain)) // https://en.wikipedia.org/wiki/.localhost
	if (isꓽlocalhost)                              return 'dev'
	const isꓽtunneledⵧngrok = ['.ngrok-free.app', '.ngrok-free.dev', '.ngrok.app', '.ngrok.dev'].some(domain => window.location.hostname.endsWith(domain)) // https://ngrok.com/blog-post/new-ngrok-domains
	if (isꓽtunneledⵧngrok)                        return 'dev'
	const isꓽtunneledⵧcloudflare = ['.cfargotunnel.com'].some(domain => window.location.hostname.endsWith(domain)) // https://developers.cloudflare.com/cloudflare-one/faq/cloudflare-tunnels-faq/
	if (isꓽtunneledⵧcloudflare)                   return 'dev'

	// then detect common "hosted" locations, which mean staging
	if (window.location.hostname.endsWith('.netlify.app'))    return 'staging'
	if (window.location.hostname.endsWith('.github.io'))      return 'staging'
	if (window.location.hostname.endsWith('.pages.dev'))      return 'staging' // cloudflare
	if (window.location.hostname.endsWith('.cloudfront.net')) return 'staging' // AWS

	// finally, does it match the expected canonical URL?
	const URLⵧCANONICAL‿obj = new URL(URLⵧCANONICAL)
	if (window.location.hostname === URLⵧCANONICAL‿obj.hostname) return 'prod'

	// TODO cordova
	// TODO itch.io

	// everything else is unknown = unsafe
	return 'dev'
})()

/////////////////////////////////////////////////

export { CHANNEL }
