class Move {
    fromSq;
    toSq;
    capturedPiece;
    promotedPiece;
    isEnPassant;
    isPawnStart;
    isCastle;

    constructor() {
        this.fromSq = null;
        this.toSq = null;
        this.capturedPiece = null;
        this.promotedPiece = null;
        this.isEnPassant = false;
        this.isPawnStart = false;
        this.isCastle = false;
    }
}
class UndoMove {
    move;
    enPassantSq;
    whiteKingCastling;
    whiteQueenCastling;
    blackKingCastling;
    blackQueenCastling;

    constructor() {
        this.move = null;
        this.enPassantSq = null;
        this.whiteKingCastling = true;
        this.whiteQueenCastling = true;
        this.blackKingCastling = true;
        this.blackQueenCastling = true;
    }
}

class Piece {
    color;
    sq;

    constructor(color, sq) {
        this.color = color;
        this.sq = sq;
    }
}

class Pawn extends Piece {
    constructor(color, sq) {
        super(color, sq);
        if (this.color === "white") {
            this.imgSrc = "./figure/beli_pion.png";
        } else {
            this.imgSrc = "./figure/crni_pion.png";
        }
    }

    generateMoves(board) {
        let moves = [];
        if (this.color === "white") {
            if (board.pieces[this.sq + 10] === null) {
                let move = new Move();

                move.fromSq = this.sq;
                move.toSq = this.sq + 10;

                if (Math.floor(this.sq / 10) == 8) {
                    move.promotedPiece = new Queen("white");
                }

                moves.push(move);

                if (Math.floor(this.sq / 10) === 3 && board.pieces[this.sq + 20] === null) {
                    let move = new Move();

                    move.fromSq = this.sq;
                    move.toSq = this.sq + 20;
                    move.isPawnStart = true;

                    moves.push(move);
                }
            }
            if (board.pieces[this.sq + 9] != null && board.pieces[this.sq + 9].color == "black") {
                let move = new Move();

                move.fromSq = this.sq;
                move.toSq = this.sq + 9;
                move.capturedPiece = board.pieces[this.sq + 9];

                if (Math.floor(this.sq / 10) == 8) {
                    move.promotedPiece = new Queen("white");
                }

                moves.push(move);
            }
            if (board.pieces[this.sq + 11] != null && board.pieces[this.sq + 11].color == "black") {
                let move = new Move();

                move.fromSq = this.sq;
                move.toSq = this.sq + 11;
                move.capturedPiece = board.pieces[this.sq + 11];

                if (Math.floor(this.sq / 10) == 8) {
                    move.promotedPiece = new Queen("white");
                }

                moves.push(move);
            }
            // En passant
            if (board.enPassantSq !== null) {
                if (this.sq + 9 === board.enPassantSq) {
                    let move = new Move();

                    move.fromSq = this.sq;
                    move.toSq = this.sq + 9;
                    move.isEnPassant = true;

                    moves.push(move);
                } else if (this.sq + 11 === board.enPassantSq) {
                    let move = new Move();

                    move.fromSq = this.sq;
                    move.toSq = this.sq + 11;
                    move.isEnPassant = true;

                    moves.push(move);
                }
            }
        } else if (this.color === "black") {
            if (board.pieces[this.sq - 10] === null) {
                let move = new Move();

                move.fromSq = this.sq;
                move.toSq = this.sq - 10;

                if (Math.floor(this.sq / 10) == 3) {
                    move.promotedPiece = new Queen("black");
                }

                moves.push(move);

                if (Math.floor(this.sq / 10) === 8 && board.pieces[this.sq - 20] === null) {
                    let move = new Move();

                    move.fromSq = this.sq;
                    move.toSq = this.sq - 20;
                    move.isPawnStart = true;

                    moves.push(move);
                }
            }
            if (board.pieces[this.sq - 9] != null && board.pieces[this.sq - 9].color == "white") {
                let move = new Move();

                move.fromSq = this.sq;
                move.toSq = this.sq - 9;
                move.capturedPiece = board.pieces[this.sq - 9];

                if (Math.floor(this.sq / 10) == 3) {
                    move.promotedPiece = new Queen("black");
                }

                moves.push(move);
            }
            if (board.pieces[this.sq - 11] != null && board.pieces[this.sq - 11].color == "white") {
                let move = new Move();
                move.fromSq = this.sq;
                move.toSq = this.sq - 11;
                move.capturedPiece = board.pieces[this.sq - 11];

                if (Math.floor(this.sq / 10) == 3) {
                    move.promotedPiece = new Queen("black");
                }

                moves.push(move);
            }
            // En passant
            if (board.enPassantSq !== null) {
                if (this.sq - 9 === board.enPassantSq) {
                    let move = new Move();

                    move.fromSq = this.sq;
                    move.toSq = this.sq - 9;
                    move.isEnPassant = true;

                    moves.push(move);
                } else if (this.sq - 11 === board.enPassantSq) {
                    let move = new Move();

                    move.fromSq = this.sq;
                    move.toSq = this.sq - 11;
                    move.isEnPassant = true;

                    moves.push(move);
                }
            }
        }

        return moves;
    }
}

class Bishop extends Piece {
    constructor(color, sq) {
        super(color, sq);
        if (this.color === "white") {
            this.imgSrc = "./figure/beli_lovac.png";
        } else {
            this.imgSrc = "./figure/crni_lovac.png";
        }
    }

    generateMoves(board) {
        let moves = [];
        let pieceDirection = [-9, -11, 11, 9];

        for (let i = 0; i < pieceDirection.length; i++) {
            let currentDirection = pieceDirection[i];
            let currentSquare = this.sq + currentDirection;
            let piece = board.pieces[currentSquare];

            while (!(piece instanceof OffLimits)) {
                if (piece !== null) {
                    if (piece.color !== this.color) {
                        let move = new Move();

                        move.fromSq = this.sq;
                        move.toSq = currentSquare;
                        move.capturedPiece = piece;

                        moves.push(move);
                    }
                    break;
                }

                let move = new Move();

                move.fromSq = this.sq;
                move.toSq = currentSquare;

                moves.push(move);

                currentSquare += currentDirection;
                piece = board.pieces[currentSquare];
            }
        }

        return moves;
    }
}

class King extends Piece {
    constructor(color, sq) {
        super(color, sq);
        if (this.color === "white") {
            this.imgSrc = "./figure/beli_kralj.png";
        } else {
            this.imgSrc = "./figure/crni_kralj.png";
        }
    }

    generateMoves(board) {
        let moves = [];
        let pieceDirection = [-1, -10, 1, 10, -9, -11, 11, 9];
        for (let i = 0; i < pieceDirection.length; i++) {
            let currentDirection = pieceDirection[i];
            let piece = board.pieces[this.sq + currentDirection];

            if (piece === null) {
                let move = new Move();

                move.fromSq = this.sq;
                move.toSq = this.sq + currentDirection;

                moves.push(move);
            } else if (!(piece instanceof OffLimits) && piece.color !== this.color) {
                let move = new Move();

                move.fromSq = this.sq;
                move.toSq = this.sq + currentDirection;
                move.capturedPiece = piece;

                moves.push(move);
            }
        }

        // Castling

        if (this.color === "white") {
            if (
                board.whiteKingCastling &&
                board.pieces[26] === null &&
                board.pieces[27] === null &&
                !board.isSquareAttacked(25, "black") &&
                !board.isSquareAttacked(26, "black") &&
                !board.isSquareAttacked(27, "black")
            ) {
                let move = new Move();

                move.fromSq = 25;
                move.toSq = 27;
                move.isCastle = true;

                moves.push(move);
            }
            if (
                board.whiteQueenCastling &&
                board.pieces[24] === null &&
                board.pieces[23] === null &&
                board.pieces[22] === null &&
                !board.isSquareAttacked(25, "black") &&
                !board.isSquareAttacked(24, "black") &&
                !board.isSquareAttacked(23, "black")
            ) {
                let move = new Move();

                move.fromSq = 25;
                move.toSq = 23;
                move.isCastle = true;

                moves.push(move);
            }
        } else {
            if (
                board.blackKingCastling &&
                board.pieces[96] === null &&
                board.pieces[97] === null &&
                !board.isSquareAttacked(95, "white") &&
                !board.isSquareAttacked(96, "white") &&
                !board.isSquareAttacked(97, "white")
            ) {
                let move = new Move();

                move.fromSq = 95;
                move.toSq = 97;
                move.isCastle = true;

                moves.push(move);
            }
            if (
                board.blackQueenCastling &&
                board.pieces[94] === null &&
                board.pieces[93] === null &&
                board.pieces[92] === null &&
                !board.isSquareAttacked(95, "white") &&
                !board.isSquareAttacked(94, "white") &&
                !board.isSquareAttacked(93, "white")
            ) {
                let move = new Move();

                move.fromSq = 95;
                move.toSq = 93;
                move.isCastle = true;

                moves.push(move);
            }
        }

        return moves;
    }
}

class Queen extends Piece {
    constructor(color, sq) {
        super(color, sq);
        if (this.color === "white") {
            this.imgSrc = "./figure/bela_dama.png";
        } else {
            this.imgSrc = "./figure/crna_dama.png";
        }
    }

    generateMoves(board) {
        let moves = [];
        let pieceDirection = [-1, -10, 1, 10, -9, -11, 11, 9];
        for (let i = 0; i < pieceDirection.length; i++) {
            let currentDirection = pieceDirection[i];
            let currentSquare = this.sq + currentDirection;
            let piece = board.pieces[currentSquare];

            while (!(piece instanceof OffLimits)) {
                if (piece !== null) {
                    if (piece.color !== this.color) {
                        let move = new Move();

                        move.fromSq = this.sq;
                        move.toSq = currentSquare;
                        move.capturedPiece = piece;

                        moves.push(move);
                    }
                    break;
                }

                let move = new Move();

                move.fromSq = this.sq;
                move.toSq = currentSquare;

                moves.push(move);

                currentSquare += currentDirection;
                piece = board.pieces[currentSquare];
            }
        }

        return moves;
    }
}

class Rook extends Piece {
    constructor(color, sq) {
        super(color, sq);
        if (this.color === "white") {
            this.imgSrc = "./figure/beli_top.png";
        } else {
            this.imgSrc = "./figure/crni_top.png";
        }
    }

    generateMoves(board) {
        let moves = [];
        let pieceDirection = [-1, -10, 1, 10];
        for (let i = 0; i < pieceDirection.length; i++) {
            let currentDirection = pieceDirection[i];
            let currentSquare = this.sq + currentDirection;
            let piece = board.pieces[currentSquare];

            while (!(piece instanceof OffLimits)) {
                if (piece !== null) {
                    if (piece.color !== this.color) {
                        let move = new Move();

                        move.fromSq = this.sq;
                        move.toSq = currentSquare;
                        move.capturedPiece = piece;

                        moves.push(move);
                    }
                    break;
                }

                let move = new Move();

                move.fromSq = this.sq;
                move.toSq = currentSquare;

                moves.push(move);

                currentSquare += currentDirection;
                piece = board.pieces[currentSquare];
            }
        }

        return moves;
    }
}

class Knight extends Piece {
    constructor(color, sq) {
        super(color, sq);
        if (this.color === "white") {
            this.imgSrc = "./figure/beli_skakac.png";
        } else {
            this.imgSrc = "./figure/crni_skakac.png";
        }
    }

    generateMoves(board) {
        let moves = [];
        let pieceDirection = [-8, -19, -21, -12, 8, 19, 21, 12];
        for (let i = 0; i < pieceDirection.length; i++) {
            let currentDirection = pieceDirection[i];
            let piece = board.pieces[this.sq + currentDirection];

            if (piece === null) {
                let move = new Move();

                move.fromSq = this.sq;
                move.toSq = this.sq + currentDirection;

                moves.push(move);
            } else if (!(piece instanceof OffLimits) && piece.color !== this.color) {
                let move = new Move();

                move.fromSq = this.sq;
                move.toSq = this.sq + currentDirection;
                move.capturedPiece = piece;

                moves.push(move);
            }
        }

        return moves;
    }
}

class OffLimits extends Piece {
    constructor(sq) {
        super("none", sq);
    }
}

class Board {
    pieces;
    pieceSelected;
    onTurn;
    enPassantSq;
    whiteKingCastling;
    whiteQueenCastling;
    blackKingCastling;
    blackQueenCastling;
    legalMoves;
    undoMoveData;

    constructor() {
        this.pieces = [];
        this.pieceSelected = null;
        this.onTurn = "white";
        this.enPassantSq = null;
        this.whiteKingCastling = true;
        this.whiteQueenCastling = true;
        this.blackKingCastling = true;
        this.blackQueenCastling = true;
        this.legalMoves = [];
        this.undoMoveData = null;

        this.init();
    }

    init() {
        this.initBoardPieces();
        this.initOffLimits();

        for (let i = 0; i < 120; i++) {
            let piece = this.pieces[i];
            if (piece !== null && !(piece instanceof OffLimits)) {
                this.addPiece(piece.sq, piece);
            }
        }

        this.legalMoves = this.generateLegalMoves(this.onTurn);
    }

    initBoardPieces() {
        for (let i = 0; i < 120; i++) {
            this.pieces[i] = null;
        }

        for (let i = 31; i < 39; i++) {
            this.pieces[i] = new Pawn("white", i);
        }

        this.pieces[21] = new Rook("white", 21);
        this.pieces[22] = new Knight("white", 22);
        this.pieces[23] = new Bishop("white", 23);
        this.pieces[24] = new Queen("white", 24);
        this.pieces[25] = new King("white", 25);
        this.pieces[26] = new Bishop("white", 26);
        this.pieces[27] = new Knight("white", 27);
        this.pieces[28] = new Rook("white", 28);

        for (let i = 81; i < 89; i++) {
            this.pieces[i] = new Pawn("black", i);
        }

        this.pieces[91] = new Rook("black", 91);
        this.pieces[92] = new Knight("black", 92);
        this.pieces[93] = new Bishop("black", 93);
        this.pieces[94] = new Queen("black", 94);
        this.pieces[95] = new King("black", 95);
        this.pieces[96] = new Bishop("black", 96);
        this.pieces[97] = new Knight("black", 97);
        this.pieces[98] = new Rook("black", 98);
    }

    initOffLimits() {
        for (let i = 0; i < 20; i++) {
            this.pieces[i] = new OffLimits(i);
        }

        for (let i = 20; i < 100; i += 10) {
            this.pieces[i] = new OffLimits(i);
        }

        for (let i = 29; i < 100; i += 10) {
            this.pieces[i] = new OffLimits(i);
        }

        for (let i = 100; i < 120; i++) {
            this.pieces[i] = new OffLimits(i);
        }
    }

    isSquareAttacked(sq, color) {
        let piece = null;
        let pieceDirection = null;

        if (color === "white") {
            piece = this.pieces[sq - 11];
            if (piece instanceof Pawn && piece.color === "white") return true;
            piece = this.pieces[sq - 9];
            if (piece instanceof Pawn && piece.color === "white") return true;
        } else {
            piece = this.pieces[sq + 11];
            if (piece instanceof Pawn && piece.color === "black") return true;
            piece = this.pieces[sq + 9];
            if (piece instanceof Pawn && piece.color === "black") return true;
        }

        pieceDirection = [-8, -19, -21, -12, 8, 19, 21, 12];
        for (let i = 0; i < pieceDirection.length; i++) {
            piece = this.pieces[sq + pieceDirection];
            if (piece instanceof Knight && piece.color === color) return true;
        }

        pieceDirection = [-1, -10, 1, 10];
        for (let i = 0; i < pieceDirection.length; i++) {
            let currentDirection = pieceDirection[i];
            let currentSquare = sq + currentDirection;
            piece = this.pieces[currentSquare];

            while (!(piece instanceof OffLimits)) {
                if (piece != null) {
                    if ((piece instanceof Rook || piece instanceof Queen) && piece.color === color) {
                        return true;
                    }
                    break;
                }
                currentSquare += currentDirection;
                piece = this.pieces[currentSquare];
            }
        }

        pieceDirection = [-9, -11, 11, 9];
        for (let i = 0; i < pieceDirection.length; ++i) {
            let currentDirection = pieceDirection[i];
            let currentSquare = sq + currentDirection;
            piece = this.pieces[currentSquare];

            while (!(piece instanceof OffLimits)) {
                if (piece != null) {
                    if ((piece instanceof Bishop || piece instanceof Queen) && piece.color === color) {
                        return true;
                    }
                    break;
                }
                currentSquare += currentDirection;
                piece = this.pieces[currentSquare];
            }
        }

        pieceDirection = [-1, -10, 1, 10, -9, -11, 11, 9];
        for (let i = 0; i < pieceDirection.length; i++) {
            piece = this.pieces[sq + pieceDirection];
            if (piece instanceof King && piece.color === color) return true;
        }

        return false;
    }

    doMove(move) {
        this.undoMoveData = new UndoMove();

        this.undoMoveData.move = move;
        this.undoMoveData.enPassantSq = this.enPassantSq;
        this.undoMoveData.whiteKingCastling = this.whiteKingCastling;
        this.undoMoveData.whiteQueenCastling = this.whiteQueenCastling;
        this.undoMoveData.blackKingCastling = this.blackKingCastling;
        this.undoMoveData.blackQueenCastling = this.blackQueenCastling;

        // If king or rook is moving, update castling booleans

        let piece = this.pieces[move.fromSq];

        if (piece instanceof King) {
            if (piece.color === "white") {
                this.whiteQueenCastling = false;
                this.whiteKingCastling = false;
            } else {
                this.blackQueenCastling = false;
                this.blackKingCastling = false;
            }
        }

        if (piece instanceof Rook) {
            if (piece.color === "white") {
                if (move.fromSq === 21) {
                    this.whiteQueenCastling = false;
                }
                if (move.fromSq === 28) {
                    this.whiteKingCastling = false;
                }
            } else {
                if (move.fromSq === 91) {
                    this.blackQueenCastling = false;
                }
                if (move.fromSq === 98) {
                    this.blackKingCastling = false;
                }
            }
        }

        if (move.isEnPassant) {
            if (this.onTurn === "white") {
                this.removePiece(move.toSq - 10);
            } else {
                this.removePiece(move.toSq + 10);
            }
        }
        if (move.isCastle) {
            if (move.toSq === 23) {
                this.movePiece(21, 24);
            } else if (move.toSq === 93) {
                this.movePiece(91, 94);
            } else if (move.toSq === 27) {
                this.movePiece(28, 26);
            } else if (move.toSq === 97) {
                this.movePiece(98, 96);
            }
        }

        this.enPassantSq = null;

        if (move.capturedPiece !== null) {
            this.removePiece(move.capturedPiece.sq);
        }

        if (move.isPawnStart) {
            if (this.pieces[move.fromSq].color === "white") {
                this.enPassantSq = move.fromSq + 10;
            } else {
                this.enPassantSq = move.fromSq - 10;
            }
        }

        this.movePiece(move.fromSq, move.toSq);

        if (move.promotedPiece !== null) {
            this.removePiece(move.toSq);
            this.addPiece(move.toSq, move.promotedPiece);
        }

        this.changeTurn();

        // If king is in check, move is illegal, undo it 

        let king = this.pieces.find((e) => e instanceof King && e.color !== this.onTurn);
        if (
            (king.color === "white" && this.isSquareAttacked(king.sq, "black")) ||
            (king.color === "black" && this.isSquareAttacked(king.sq, "white"))
        ) {
            this.undoMove();
            return false;
        }

        return true;
    }

    undoMove() {
        this.enPassantSq = this.undoMoveData.enPassantSq;
        this.whiteKingCastling = this.undoMoveData.whiteKingCastling;
        this.whiteQueenCastling = this.undoMoveData.whiteQueenCastling;
        this.blackKingCastling = this.undoMoveData.blackKingCastling;
        this.blackQueenCastling = this.undoMoveData.blackQueenCastling;

        this.changeTurn();

        if (this.undoMoveData.move.isEnPassant) {
            if (this.onTurn === "white") {
                this.addPiece(this.undoMoveData.move.toSq - 10, new Pawn("black", this.undoMoveData.move.toSq - 10));
            } else {
                this.addPiece(this.undoMoveData.move.toSq + 10, new Pawn("white", this.undoMoveData.move.toSq + 10));
            }
        }

        if (this.undoMoveData.move.isCastle) {
            if (this.undoMoveData.move.toSq === 23) {
                this.movePiece(24, 21);
            } else if (this.undoMoveData.move.toSq === 93) {
                this.movePiece(94, 91);
            } else if (this.undoMoveData.move.toSq === 27) {
                this.movePiece(26, 28);
            } else if (this.undoMoveData.move.toSq === 97) {
                this.movePiece(96, 98);
            }
        }

        this.movePiece(this.undoMoveData.move.toSq, this.undoMoveData.move.fromSq);

        if (this.undoMoveData.move.capturedPiece !== null) {
            this.addPiece(this.undoMoveData.move.capturedPiece.sq, this.undoMoveData.move.capturedPiece);
        }

        if (this.undoMoveData.move.promotedPiece !== null) {
            this.removePiece(this.undoMoveData.move.fromSq);
            this.addPiece(this.undoMoveData.move.promotedPiece.sq, new Pawn(this.undoMoveData.move.promotedPiece.color, this.undoMoveData.move.promotedPiece.sq));
        }
    }

    changeTurn() {
        if (this.onTurn === "white") {
            this.onTurn = "black";
        } else {
            this.onTurn = "white";
        }

        let statusSpan = document.getElementById("status-text");
        if (this.onTurn === "white") {
            statusSpan.classList.remove("black-move");
            statusSpan.innerHTML = "Beli na potezu";
        } else {
            statusSpan.classList.add("black-move");
            statusSpan.innerHTML = "Crni na potezu";
        }
    }

    generateAllMoves(color) {
        let allMoves = [];

        let pieces = this.pieces.filter((e) => e !== null && e.color === color);

        for (let i = 0; i < pieces.length; i++) {
            let moves = pieces[i].generateMoves(this);

            allMoves.push(...moves);
        }

        return allMoves;
    }

    generateLegalMoves(color) {
        let allMoves = this.generateAllMoves(color);

        let legalMoves = [];

        for (let i = 0; i < allMoves.length; i++) {
            let move = allMoves[i];

            if (this.doMove(move)) {
                legalMoves.push(move);

                this.undoMove();
            }
        }

        console.dir(this);

        return legalMoves;
    }

    setFieldBackground(sq, color) {
        let fieldDiv = document.getElementById("field-" + sq);
        fieldDiv.style.background = color;
    }

    addPiece(sq, piece) {
        this.pieces[sq] = piece;
        piece.sq = sq;

        let fieldDiv = document.getElementById("field-" + sq);
        let img = document.createElement("img");
        img.setAttribute("src", piece.imgSrc);
        img.classList.add("figura");
        fieldDiv.appendChild(img);
    }

    removePiece(sq) {
        this.pieces[sq] = null;

        let fieldDiv = document.getElementById("field-" + sq);
        let img = fieldDiv.children[0];
        fieldDiv.removeChild(img);
    }

    movePiece(from, to) {
        if (this.pieces[to] !== null) {
            this.removePiece(to);
        }

        this.addPiece(to, this.pieces[from]);

        this.removePiece(from);
    }

    selectPiece(sq) {
        let piece = this.pieces[sq];
        if (piece !== null) {
            this.pieceSelected = piece;

            this.setFieldBackground(this.pieceSelected.sq, "#90EE90");

            let pieceSelectedMoves = this.legalMoves.filter((e) => e.fromSq === sq);

            for (let i = 0; i < pieceSelectedMoves.length; i++) {
                this.setFieldBackground(pieceSelectedMoves[i].toSq, "#20B2AA");
            }
        }
    }

    deselectPiece() {
        this.setFieldBackground(this.pieceSelected.sq, "");

        for (let i = 0; i < this.legalMoves.length; i++) {
            this.setFieldBackground(this.legalMoves[i].toSq, "");
        }

        this.pieceSelected = null;
    }

    fieldClicked(sq) {
        if (this.pieceSelected === null) {
            let piece = this.pieces[sq];

            if (piece !== null && piece.color === this.onTurn) {
                this.selectPiece(sq);
            }

        } else if (this.pieceSelected.sq === sq) {
            this.deselectPiece();
        } else {
            for (let i = 0; i < this.legalMoves.length; i++) {
                let move = this.legalMoves[i];

                if (this.pieceSelected.sq === move.fromSq && move.toSq === sq) {
                    this.setFieldBackground(move.fromSq, "");

                    this.doMove(move);

                    this.deselectPiece();

                    this.legalMoves = this.generateLegalMoves(this.onTurn);

                    if (this.legalMoves.length === 0) {
                        this.endGame();
                    }

                    break;
                }
            }
        }
    }

    endGame() {
        let statusSpan = document.getElementById("status-text");
        if (this.onTurn === "white") {
            statusSpan.classList.add("black-move");
            statusSpan.innerHTML = "Mat! Crni je pobednik";
        } else {
            statusSpan.classList.remove("black-move");
            statusSpan.innerHTML = "Mat! Beli je pobednik";
        }
    }
}

let board = new Board();