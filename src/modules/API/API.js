//  Responsible for all interactions with database.json getting, posting, patching and deleting data

const API = {
  getData(resource) {
    return fetch(`https://speech-dewey-data.herokuapp.com/${resource}`)
      .then(response => response.json())
  },
  getWordsByCategory(categoryid) {
    return fetch(`https://speech-dewey-data.herokuapp.com/cards?categoryId=${categoryid}`)
      .then(response => response.json())
  },
  getAllWrongWords(correctid) {
    return fetch(`https://speech-dewey-data.herokuapp.com/cards?userId=0&id_ne=${correctid}`)
      .then(response => response.json())
  },
  getUserWrongWords(userid, correctid) {
    return fetch(`http://localhost:8088/cards?userId=${userid}&id_ne=${correctid}`)
      .then(response => response.json())
  },
  saveData(resource, entryObject) {
    return fetch(`https://speech-dewey-data.herokuapp.com/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entryObject)

    })
      .then(response => response.json())
  },
  editData(resource, entryObject, id) {
    return fetch(`https://speech-dewey-data.herokuapp.com/${resource}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entryObject)
    })
      .then(response => response.json())
  },
  deleteData(resource, id) {
    return fetch(`https://speech-dewey-data.herokuapp.com/${resource}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
  },
  getUserCards(userid) {
    return fetch(`https://speech-dewey-data.herokuapp.com/cards?userId=${userid}`)
      .then(response => response.json())
  },
  // Fetches users cardScores.
  getUserScoreData(userid) {
    return fetch(`https://speech-dewey-data.herokuapp.com/cardScores?userId=${userid}`)
      .then(response => response.json())

  }
}



export default API