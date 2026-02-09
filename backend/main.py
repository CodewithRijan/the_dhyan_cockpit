from fastapi import FastAPI

app = FastAPI()

# v1/api/sessions HTTP GET
# v1/api/sessions HTTP POST


@app.get("/sessions")
async def getSessions():

    return {"message": "Sessions returned successfully."}


@app.get("/sessions/{session_id}")
async def getSessionsById(session_id: str):

    return {"message": f"Session by {session_id} returned successfully."}


@app.post("/sessions")
async def postSession(body):

    data = body.json()

    return {"message": "Session posted successfully"}
