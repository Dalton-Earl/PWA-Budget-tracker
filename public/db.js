const getAll = store.getALL();

getAll.onsuccess = function(){
    if (getAll.result.length > 0){
        fetch("/api/transaction/bulk", {
            method: "POST",
            body :JSON.stringify(getAll.result),
            headers:{
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(()=>{
            const transaction = db.transaction(["pending"], "readwrite");

            const store = transaction.objectStore("pending");

            store.clear();
        })
    }
}

window.addEventListener("online", checkDatabase);