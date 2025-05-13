const ideologies = [
    {
        name: "Anarcho-Capitalist",
        description: "You're the type who thinks the free market can solve everything, including who gets to clean the streets. You probably have a 'Taxation is Theft' bumper sticker and a secret desire to privatize the air we breathe. Your ideal society is basically the Wild West, but with more cryptocurrency.",
        score: 0
    },
    {
        name: "Libertarian",
        description: "You want the government out of your life, but you're not quite ready to start your own private police force. You believe in personal freedom, as long as it doesn't involve helping other people. Your favorite pastime is explaining why universal healthcare would be worse than the current system.",
        score: 0
    },
    {
        name: "Centrist",
        description: "The Switzerland of political ideologies. You're so moderate that you can't even decide which side of the bed to sleep on. You believe in compromise, even when it makes no sense. Your political views are like a weather vane in a tornado.",
        score: 0
    },
    {
        name: "Social Democrat",
        description: "You want to save the world, but you're not quite ready to give up your iPhone. You believe in social justice, as long as it doesn't inconvenience you too much. Your ideal society is Sweden, but with better weather and more tacos.",
        score: 0
    },
    {
        name: "Democratic Socialist",
        description: "You're the type who reads Marx for fun and has a 'Tax the Rich' t-shirt. You believe in worker ownership, but you're not quite sure how to explain it to your parents. Your ideal society is a mix between a co-op and a music festival.",
        score: 0
    },
    {
        name: "Anarcho-Communist",
        description: "You're so far left that you've come full circle and are now living in a treehouse. You believe in abolishing all hierarchies, except the hierarchy of who makes the best kombucha. Your ideal society is a commune where everyone shares everything, including their Spotify playlists.",
        score: 0
    },
    {
        name: "Authoritarian Socialist",
        description: "You believe in strong central planning, preferably with you at the center. You think everyone should have equal rights, as long as they agree with you. Your ideal society is a perfectly organized beehive, with you as the queen bee.",
        score: 0
    },
    {
        name: "Technocratic Anarchist",
        description: "You're the type who thinks blockchain can solve world hunger. You believe in abolishing the state and replacing it with smart contracts. Your ideal society is a decentralized autonomous organization that runs on solar power and good vibes.",
        score: 0
    }
];

const quotes = [
    "Remember: In a truly free market, even your thoughts would be privatized!",
    "Your political views are like a kale smoothie: healthy but hard to swallow.",
    "You're so radical, even your coffee is fair trade and locally sourced!",
    "Your ideology is like a vegan at a barbecue: principled but slightly out of place.",
    "You're the type who would start a revolution, but only if it's properly organized and has good catering."
];

function getResult(answers) {
    // Reset scores
    ideologies.forEach(ideology => ideology.score = 0);

    // Score each answer
    answers.forEach((answer, index) => {
        // Weight questions differently based on their importance
        const weight = index < 5 ? 2 : 1;

        // Update scores based on answers
        // 0-1 answers lean right, 2-3 answers lean left
        if (answer <= 1) {
            ideologies[0].score += weight; // Anarcho-Capitalist
            ideologies[1].score += weight; // Libertarian
        } else {
            ideologies[4].score += weight; // Democratic Socialist
            ideologies[5].score += weight; // Anarcho-Communist
        }

        // Add some randomness to make it more interesting
        ideologies.forEach(ideology => {
            ideology.score += Math.random() * 0.5;
        });
    });

    // Find the ideology with the highest score
    const result = ideologies.reduce((prev, current) => {
        return (prev.score > current.score) ? prev : current;
    });

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return {
        name: result.name,
        description: result.description,
        quote: randomQuote
    };
} 