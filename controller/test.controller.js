const testPostController = (req, res)=>{
    const {name, password , email}= req.body
    res.status(200).send(`your name is${name ,password,email}`)
}

export default  testPostController