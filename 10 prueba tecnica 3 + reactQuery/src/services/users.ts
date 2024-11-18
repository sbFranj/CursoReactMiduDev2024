export const fetchUsers = async ({pageParam=1}:{pageParam?:number})=>{
	return await 	fetch(`https://randomuser.me/api?results=10&seed=fransanchez&page=${pageParam}`)
	.then((res) => res.json())
	.then((res) =>  {
		const nextCursor = Number(res.info.page) + 1
		return {
			users:res.results,
			nextCursor
		}
	})
} 