import { Client4 } from 'hoa-redux/client';

export const getUsersIncludeImage = async (users) => {
    const usersIncludeImage = users.map(async item => {
        const image = await Client4.getProfileImage(item.id);
        return { ...item, image }
    })
    const result = await Promise.all(usersIncludeImage)
    return result
}

export const getSpacesIncludeImage = async (spaces) => {
    const spacesIncludeImage = spaces.map(async item => {
        const image = await Client4.getSpaceImage(item.id)
        return { ...item, space_image: image }
    })
    const result = await Promise.all(spacesIncludeImage)
    return result
}