const react = require('react');

const directions = gameState => {
    switch (gameState[0]) {
        case '0':
            if (gameState[1] === '0') {
                return (
                    `Ground Rules: The questions and activities on the cards can generate good conversation amongst the group. Discuss 
                    any ground rules needed to keep the discussion on task and a safe place for all participants.
                    `
                )
            } else if (gameState[1] === '1') {
                return (
                    `Pick an area that you want to make change or stimulate some movement. We will call that your intention.`
                )
            }
        case '1':
            if (gameState[1] === '0') {
                return (
                    `
                        Observe where and who you are at this moment. What can you let go? 
                        Then, brush yourself off with your hands to release attachments, imitating a metal too, to chip away the past.

                    `
                );
            }
        case '2':
            if (gameState[1] === '0') {
                return (

                    "Movement: Put one hand on your heart and the other on your stomach. As you breathe in slowly swing your hands open.As your breathe out, slowly swing your hands back to your body. Imagine water flowing into you. Repeat movement for 5 breaths with eyes closed. Description: Release resistance, broaden your perspective and increase your creativity. Where do you limit yourself? Open to inspiration. Water is the element energy you draw upon to connect with the formless and open to the flow of life."

                );
            }
        case '3':
            if (gameState[1] === '0') {
                return (
                    `Description: Clarify insights and an emerging vision and direction. Wood is the element energy you draw upon for clear, upward growth. This 3rd mindful move offers you a new beginning.
                    Movement: Slowly raise your hands up toward the sky and imagine nurturing the new growth of your intention with the sun. Imitate this clear, upward energy of plants for 5 breaths.
                    `
                );
            }
        case '4':
            if (gameState[1] === '0') {
                return (
                    `Description: Take action and connect with others. Fire is the element you draw upon for peak power, more expansion and synergy with others. This 4th mindful move brings light, joy, action and connection.
                    Movement: Fire movement engages and connects. Rub your hands together and then connect your hands with other players or objects in the room. Notice the spark and touch of synergy.
                    `
                );
            }
        case '5':
            if (gameState[1] === '0') {
                return (
                    `Description: Maintain efforts with practice, structure and support. Earth is the element energy you draw upon to host and ground, providing an overall sense of well-being. This 5th mindful move offers stability and sustainability as you transition.
                    Movement: Place your hands on your thighs, meditate for 5 breaths to connect you with a quiet grounding energy.
                    `
                );
            }
        case '6':
            return '';
        default:
            return '';
    }
}


module.exports = directions;