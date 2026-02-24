export default async function handler(req, res) {
    const { username } = req.query;
    const RAPID_API_KEY = "e3cd2d0d2fmsh0dced0acd30a539p1c7338jsn42c4ecbbcca6"; // Sua chave fica segura aqui no servidor

    if (!username) {
        return res.status(400).json({ error: "Username é obrigatório" });
    }

    const url = `https://instagram-data-sdk.p.rapidapi.com/user/info?username=${username}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': 'instagram-data-sdk.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        
        // Retornamos apenas o que o frontend precisa
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar dados" });
    }

}
