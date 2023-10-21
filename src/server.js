// const express = require("express")
// const axios = require("axios")
// const app = express()

// app.get("/users", async (req, res) => {
//     try {
//         const response = await axios.get("https://gorest.co.in/public/v2/users")
//         const data = response.data.data
//         res.json(data)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({error: "An error occured while fetching data."})
//     }
// })

// app.put("/users/:id", async (req, res) => {

//     const userId = req.params.id
//     const updatedData = req.body

//     const config = {
//         headers: {
//             "Authorization": "Bearer cbda4f94df558662e666ca3a9f8ea689f2767e53731651d21b02db5f3c88b3cc"
//         }
//     }

//     try {
//         const response = await axios.put(`https://gorest.co.in/public/v2/users/${userId}`, updatedData, config)
//         const data = response.data
//         res.json(data)
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({error: "An error occured while updating user data."})

//     }
// })


// app.listen(3000, () => {
//     console.log("Server Started At port 3000")
// })