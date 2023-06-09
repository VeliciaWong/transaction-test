import Head from "next/head";
import * as React from "react";
import { useMemo, useState, useEffect } from "react";
import { TableGroup } from "components/tables";
import Button from "components/button/Button";
import { createColumnHelper } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { axiosDb } from "components/helpers/axios";
import TransactionList from "components/helpers/transactionList";

export default function Home() {
    const [payments, setPayments] = useState([]);
    useEffect(() => {
        fetchPayments();
      }, []);
    
      const fetchPayments = async () => {
        try {
          const response = await axiosDb.get('/transactionList');
          setPayments(response.data);
        } catch (error) {
          console.error(error);
        }
      };


    // CONNECT WITH DATA FROM BACKEND

    // const [rows, setRows] = useState([]);
    // const transactionListQuery = useQuery({
    //     queryKey: ["transaction-list"],
    //     queryFn: async () => {
    //       let result = await axiosDb.get(`/`,{
    //         
    //         }
    //     });
    //     return result.data
    //     },
    // });

    const columnHelper = createColumnHelper();
    const columns = useMemo(
        () => [
        columnHelper.accessor("kode", {
            header: () => <span>No</span>,
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("pembayaran", {
            header: () => <span>Pembayaran</span>,
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("periode", {
            header: () => <span>Periode</span>,
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("tglbayar", {
            header: () => <span>Tanggal Pembayaran</span>,
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("kodebank", {
            header: () => <span>Kode Bank</span>,
            cell: (info) => info.getValue(),
        }),
        ],
        []
        // [transactionListQuery?.data]
    );

    return(
        <div className="bg-[#24A6DE] relative">
            <Head>
                <title>Daftar Transaksi Pembayaran</title>
                <meta name="description" content="Web description" />
            </Head>
            <div className="h-screen w-screen flex flex-col">
                <header className="pt-20 px-4 pb-[15px] bg-[#24A3D91A]">
                    <div className="font-bold text-center text-white text-4xl mt-[16px]">
                        Daftar Transaksi Pembayaran 2023
                    </div>
                </header>
                <div>
                    <div className="w-screen px-10 mt-[5%] ">
                        <TableGroup data={payments} columns={columns} />
                    </div>
                    <br />
                    <div className="flex justify-end pr-10">
                        <Link rel="stylesheet" href="/inputTransaction">
                            <Button style={{ width: "150px" }}>
                                Input
                            </Button>   
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        
    );
}