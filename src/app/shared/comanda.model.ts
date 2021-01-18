export class Comanda {
    ComandaID: number | undefined;
    ComandaNr: string | undefined;
    ClientID: number | undefined;
    MetPlata: string | undefined;
    Total: number | undefined;
    ItemeComenziSterseID: string | undefined; //ca sa tinem cont de item-urile sterse dintr-o comanda, ca sa putem actualiza restul tabelelor
                                                // a trebuit adaugat si in Comanda.cs
}
