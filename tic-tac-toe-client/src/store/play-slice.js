import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import playService from "../service/play-service";

export const move = createAsyncThunk('play/move', async (payload, thunkAPI) => {
    try {
        // has: {status, grid, winner}
        const response = await playService.move(payload);
        if (!response || response.status === "ERROR" || !response.grid)
            return thunkAPI.rejectWithValue("Error during play...");
        return response;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const getScore = createAsyncThunk('play/score', async (payload, thunkAPI) => {
    try {
        // has: {status, grid, winner}
        const response = await playService.getScore(payload);
        if (!response || response.status === "ERROR")
            return thunkAPI.rejectWithValue("Error Getting Score");
        console.log(response)
        return response;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const listGames = createAsyncThunk('play/list', async (payload, thunkAPI) => {
    try {
        const response = await playService.listGames(payload);
        if (!response || response.status === "ERROR")
            return thunkAPI.rejectWithValue("Error Getting List of Games");
        return response;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})


export const gameDetails = createAsyncThunk('play/detail', async (payload, thunkAPI) => {
    try {
        const response = await playService.gameDetails(payload);
        if (!response || response.status === "ERROR")
            return thunkAPI.rejectWithValue("Error Getting Details for a Game");
        return response;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const playSlice = createSlice({
    name: "play",
    initialState: {
        board: ["", "", "", "", "", "", "", "", ""],
        player: "O",
        winner: "",
        isError: false,
        isSuccess: false,
        status: "",
        message: "",
        win: 0,
        loss: 0,
        tie: 0,
        gameList: [],
        gameDetailGrid: [],
        gameDetailWinner: [],
        gameDetailStartDate: "",
        gameDetailId: ""
    },
    reducers: {
        reset: state => {
            state.board = ["", "", "", "", "", "", "", "", ""];
            state.isSuccess = false;
            state.isError = false;
            state.status = "";
            state.message = "";
            state.winner = "";
        },
        getExtraGameDetail: (state,action) => {
            console.log(action.payload)
            state.gameDetailStartDate = action.payload.startDate;
            state.gameDetailId = action.payload.gameId;
        }
    },
    extraReducers: (builder => {
        builder
            .addCase(move.fulfilled, (state, action) => {
                state.board = action.payload.grid;
                state.isSuccess = true;
                state.status = action.payload.status;
                state.winner = action.payload.winner;
            })
            .addCase(move.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getScore.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.win = action.payload.human;
                state.loss = action.payload.wopr;
                state.tie = action.payload.tie;
                state.status = action.payload.status
            })
            .addCase(getScore.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(listGames.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.gameList = action.payload.games;
                state.status = action.payload.status;
            })
            .addCase(listGames.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(gameDetails.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.gameDetailGrid= action.payload.grid;
                state.gameDetailWinner = action.payload.winner;
                state.status = action.payload.status;
            })
            .addCase(gameDetails.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            })
    })
})

export const {reset,getExtraGameDetail} = playSlice.actions;
export default playSlice.reducer;