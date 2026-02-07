from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def getSessions():

    return {"message": "Sessions returned successfully."}
