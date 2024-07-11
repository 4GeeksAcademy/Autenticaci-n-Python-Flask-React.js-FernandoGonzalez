const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            user: null,
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
            ]
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            },

            login: async (email, password) => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });
                    const data = await resp.json();
                    if (!resp.ok) {
                        throw new Error(data.msg || "Error al iniciar sesión");
                    }
                    sessionStorage.setItem("accessToken", data.token);
                    setStore({ user: data.user });
                    return data;
                } catch (error) {
                    console.log("Error Al Iniciar Sesion", error);
                    throw error;
                }
            },

            loadUserFromToken: async () => {
                const token = sessionStorage.getItem("accessToken");
                if (!token) return false;
            
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/user", {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
            
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
            
                    const data = await response.json();
                    setStore({ user: data.user });
                } catch (error) {
                    console.error("Error loading user from token:", error);
                    setStore({ user: null });
                }
            },
            
            

            logout: () => {
                sessionStorage.removeItem("accessToken");
                setStore({ user: null });
            }
        }
    };
};

export default getState;



