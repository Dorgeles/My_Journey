const API_URL = "http://localhost:1996"; 

export async function listLogEntry() {
    const reponse = await fetch(`${API_URL}/api/logs`);
    return reponse.json(); 
}

export async function createLogEntry(entry) {
    const reponse = await fetch(`${API_URL}/api/logs`, {
        method: "POST", 
        headers : {
            'content-type': 'application/json',
        },
        body: JSON.stringify(entry),
    });
    return reponse.json(); 
}
