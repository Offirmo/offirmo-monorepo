
import { createPublicClient, http, formatEther } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
	chain: mainnet,
	transport: http(),
})

//console.log({blockNumber: await client.getBlockNumber()})

// The below will send a single Batch JSON-RPC HTTP request to the RPC Provider.
const arr = await Promise.all([
	client.getBalance({ address: '0xd2135CfB216b74109775236E36d4b433F1DF507B' }),
	client.getEnsName({ address: '0xd2135CfB216b74109775236E36d4b433F1DF507B' }),
])
arr[0] = formatEther(arr[0])
console.log(`XXX `, arr)
