
function Formation({ title, categorie = "none", author = "Utilisateur anonyme",lesson =[] , isQuizz = false, likeCount = 0, cover = "none", comments = []}) {
    const id = title.toLowerCase().replace(/\s+/g, '');

    return {
        id,
        isQuizz,
        title,
        author,
        categorie,
        comments,
        lesson,
        likeCount,
        cover
    };
}

export default Formation;