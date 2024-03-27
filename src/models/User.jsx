function User({ username, email, password, type, icon, followedFormation = [], likedFormation = [], createdFormation = []}) {
    const userId = username.toLowerCase().replace(/\s+/g, '');

    return {
        userId,
        username,
        email,
        type,
        icon,
        password,
        followedFormation,
        likedFormation,
        createdFormation
    };
}

export default User;