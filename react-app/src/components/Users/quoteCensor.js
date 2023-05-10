function quoteCensor (quoteAuthor) {
    const bannedNames = ['hitler', 'stalin', 'mussolini']
    for(let index in bannedNames){
        if(quoteAuthor.toLowerCase().includes(bannedNames[index])){
            return "Unknown"
        }
    }
    return quoteAuthor
}

export default quoteCensor
