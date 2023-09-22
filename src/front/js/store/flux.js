const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			currentUser: null,
		},
		actions: {
			// Use getActions to call a function within a fuction
			
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			
			setUser: (user) => {
				setStore({ currentUser: user })
			},

			getUserPackages: async (userId) => {
				try{
					const resp = await fetch(process.env.BACKEND_URL + `/api/packages/${userId}`)
					const data = await resp.json()
					return data;
				}catch(error){
					console.log("Error loading packages from backend", error)
				}
			},
		}
	};
};

export default getState;
