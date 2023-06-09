import * as React from "react";
import { useEffect } from "react";

export default function TransactionList()  {
    const Transactions= [
        {
        "kode": "1",
        "pembayaran": "200000",
        "periode": "Juli 2023",
        "tglbayar": "2 Juli 2023",
        "bankid": "BCA1"
        },
        {
            "kode": "1",
            "pembayaran": "300000",
            "periode": "Agustus 2023",
            "tglbayar": "",
            "bankid": ""
        },
        {
            "kode": "2",
            "pembayaran": "300000",
            "periode": "Juli 2023",
            "tglbayar": "4 Juli 2023",
            "bankid": "BCA2"
        },
        {
            "kode": "3",
            "pembayaran": "543333",
            "periode": "Juli 2023",
            "tglbayar": "8 Juli 2023",
            "bankid": "BCA2"
        },
        {
            "kode": "4",
            "pembayaran": "500000",
            "periode": "Agustus 2023",
            "tglbayar": "",
            "bankid": ""
        },
        {
            "kode": "6",
            "pembayaran": "500000",
            "periode": "Agustus 2023",
            "tglbayar": "",
            "bankid": ""
        },
    ];
}