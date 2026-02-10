import { ImageKit } from "@imagekit/nodejs/client.js";


const client = new ImageKit({
    privateKey: "private_RaBd9WErikfcnn9+ud/4TwZKRu8="
})

const uploadFile = async (buffer) =>{
    const result = await client.files.upload({
        file: buffer.toString("base64"),
        fileName: "image.jpg"
    })

    return result
}

export default uploadFile;