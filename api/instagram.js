export default async function handler(req, res) {
    const { username } = req.query;
    const RAPID_API_KEY = process.env.RAPID_API_KEY;

    if (!username) return res.status(400).json({ error: "Usuário não fornecido" });

    // URL para busca de detalhes do perfil
    const url = `https://instagram-data12.p.rapidapi.com/user/details-by-username/?username=${username}`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': RAPID_API_KEY,
                'X-RapidAPI-Host': 'instagram-data12.p.rapidapi.com'
            }
        });

        const data = await response.json();

        // Verificação de segurança: se a API não retornar os campos esperados, evitamos enviar zeros.
        if (!data || !data.username) {
            return res.status(404).json({ error: "Perfil não encontrado na API" });
        }

        res.status(200).json({
            username: data.username,
            posts: data.edge_owner_to_timeline_media?.count || 0,
            followers: data.edge_followed_by?.count || 0,
            following: data.edge_follow?.count || 0,
            avatar: data.profile_pic_url_hd
        });
    } catch (error) {
        res.status(500).json({ error: "Erro de conexão com o servidor da API" });
    }
}
