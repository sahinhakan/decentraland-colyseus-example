export const uiCanvas = new UICanvas()

const allPlayersBackground2 = new UIScrollRect(uiCanvas)
allPlayersBackground2.positionX = "-41%";
allPlayersBackground2.positionY = "10%";
allPlayersBackground2.width = 200;
allPlayersBackground2.height = 200;
allPlayersBackground2.backgroundColor = Color4.Black()
allPlayersBackground2.opacity = 0.5;
allPlayersBackground2.isVertical = true
//allPlayersBackground2.isHorizontal = true

/* const allPlayersBackground = new UIContainerRect(uiCanvas)
allPlayersBackground.alignmentUsesSize = true;
allPlayersBackground.positionX = "-41%";
allPlayersBackground.positionY = "10%";
allPlayersBackground.width = 200;
allPlayersBackground.height = 218;
allPlayersBackground.color = Color4.Black()
allPlayersBackground.opacity = 0.5; */

uiCanvas.positionX = 0;

let allPlayers: UIText = new UIText(allPlayersBackground2);
//allPlayers.positionX = "-40";
allPlayers.positionY = "0";
allPlayers.fontSize = 15;
allPlayers.width = 200;
allPlayers.height = 200;
allPlayers.hTextAlign = "left";
allPlayers.vAlign = "top";
allPlayers.color = Color4.White();
//allPlayers.outlineWidth = 1
//allPlayers.outlineColor = Color4.Red()
allPlayers.paddingLeft = 10
//allPlayers.paddingTop = 600
allPlayers.isPointerBlocker = false
allPlayers.adaptHeight = true

export function updateAllPlayersUI(players: string[]){
    allPlayers.value = `All Players:\n\n${players.join("\n")}`
}