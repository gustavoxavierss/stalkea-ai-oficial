export default async function handler(req, res) {
    const { username } = req.query;
    
    // Esta linha busca a chave que você configurou no painel da Vercel
    const RAPID_API_KEY = process.env.RAPID_API_KEY; 

    if (!username) return res.status(400).json({ error: "Usuário não fornecido" });

    // URL específica para buscar detalhes do perfil
    const url = `https://instagram-data12.p.rapidapi.com/user/details-by-username/?username=${username}`;
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': 'instagram-data12.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        
        // Enviando os dados REAIS para o seu site aparecer bonitão
        res.status(200).json({
            username: data.username,
            posts_count: data.edge_owner_to_timeline_media?.count || 0,
            followers_count: data.edge_followed_by?.count || 0,
            following_count: data.edge_follow?.count || 0,
            profile_pic_url: data.profile_pic_url_hd
        });
    } catch (error) {
        res.status(500).json({ error: "Erro ao conectar com o Instagram" });
    }
}
