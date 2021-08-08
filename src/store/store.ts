import React from "react";

export const TrelloContext = React.createContext({
    board: null,
    owner: null,
    users: null,
});
