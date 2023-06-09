import Head from "next/head";
import * as React from "react";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import ListBoxInput from "components/inputs/ListBox";
import DateTimePicker from "components/inputs/DateTimePicker";
import Buttons from "components/button/Button";
import { toast } from "react-toastify";
import { axiosDb } from "components/helpers/axios";
import { Input, ListBox } from "components/inputs";
import { Field, FormContainer } from "components/forms";
import { useMutation, useQuery } from "@tanstack/react-query";
import Button from "components/button";
import { useRouter } from 'next/router'
import TransactionList from "components/helpers/transactionList";

const Transaction = () =>{
    const router = useRouter()
    // data dummy for name and bank
    const student = [
        { id: 1, name: 'Durward Reynolds', unavailable: false },
        { id: 2, name: 'Kenton Towne', unavailable: false },
        { id: 3, name: 'Therese Wunsch', unavailable: false },
        { id: 4, name: 'Benedict Kessler', unavailable: true },
        { id: 5, name: 'Katelyn Rohan', unavailable: false },
    ]

    const bank = [
        {id: 1, name: 'BCA1', unavailable: false},
        {id: 2, name: 'BCA2', unavailable: false}

    ]

    // const [selectedName, setSelectedName] = useState();
    // const [selectedBank, setSelectedBank] = useState();
    
    // const studentListQuery = useQuery({
    //     queryKey: ["student-list"],
    //     queryFn: async () => {
    //       let result = await axiosDb.post(`/`);
    //       return result.data;
    //     },
    // });

    //  const bankListQuery = useQuery({
    //     queryKey: ["bank-list"],
    //     queryFn: async () => {
    //     let result = await axiosDb.post(`/`);
    //     return result.data;
    //     },
    // });

    const createTransactionMut = useMutation({
        onSuccess: () => {
          reset(defaultValues)
          toast.success("Tagihan Pembayaran Berhasil dibuat!");
          router.push(`/`);
        },
        mutationFn: (data) =>
          axiosDb.post("/addNewTransaction", {
            ...data,
          }),
      });
    
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
      } = useForm   ({
        defaultValues: {
        },
      });


    const [newTransactionList, setNewTransactionList] = useState()

    // const addTransaction = (data) =>{
    //     // console.log(data.kode.id);
    //     var newdata = [{
    //         "kode": data.kode.id,
    //         "pembayaran": data.pembayaran,
    //         "periode": data.periode,
    //         "tglbayar": data.tglbayar,
    //         "bankid": data.bankid.name
    //     }]

    //     // console.log(newdata);
    //     setNewTransactionList(TransactionList.concat(newdata))
    //     // console.log(newTransactionList)

    //     toast.success("Tagihan Pembayaran Berhasil dibuat!");
    //     router.push(`/`);
    // }

    return(
        <>
            <div className="bg-[#24A6DE] relative">
                <Head>
                    <title>Input Tagihan Pembayaran</title>
                    <meta name="description" content="Web description" />
                </Head>
                <div className="h-screen w-screen flex flex-col">
                    <header className="pt-[4.5rem] px-4 bg-[#24A3D91A]">
                        <div className="font-bold text-center text-white text-4xl mb-1">
                            Tagihan Pembayaran
                        </div>
                    </header>

                    <div className="flex lg:flex-col xl:flex-row self-center mt-[2%] gap-[1rem]">
                        <FormContainer>
                            <div className="flex flex-col gap-[0.25rem] space-y-2 w-[500px]">
                            <div className="text-xl text-white font-semibold">
                                <Field label="Nama Murid" error={errors["kode"]?.message}>
                                    <Controller
                                    name="kode"
                                    render={({ field }) => (
                                        <ListBoxInput
                                        {...field}
                                        options={student.map((students) => ({
                                            id: students.id,
                                            name: students.name
                                        }))}
                                        // options={studentListQuery.data?.map((student) => ({
                                        //     id: student.student_id,
                                        //     name: student.student_name,
                                        // }))}
                                        />
                                    )}
                                    rules={{
                                        required: true,
                                    }}
                                    control={control}
                                    />
                                </Field>
                            </div>
                                <div className="text-xl text-white font-semibold">
                                    <Field label="Nominal (Dalam Rupiah)" error={errors["pembayaran"]?.message}>
                                        <Input
                                           type="number"
                                           {...register("pembayaran", { required: true })}
                                           min="10000"
                                           max="100000000"
                                        />
                                    </Field>
                                </div>
                                <div className="text-xl text-white font-semibold">
                                    <Field label="Periode" error={errors["periode"]?.message}>
                                        <Input
                                            {...register("periode", { required: true })}
                                        />
                                    </Field>
                                </div>
                                <div className="text-xl text-white font-semibold">
                                    <Field label="Tanggal Pembayaran" error={errors["tglbayar"]?.message}>
                                        <Input
                                            {...register("tglbayar", { required: true })}
                                        />
                                    </Field>
                                </div>
                                <div className="text-xl text-white font-semibold">
                                    <Field label="Bank" error={errors["bankid"]?.message}>
                                        <Controller
                                        name="bankid"
                                        render={({ field }) => (
                                            <ListBoxInput
                                            {...field}
                                            options={bank.map((banks) => ({
                                                id: banks.id,
                                                name: banks.name
                                            }))}
                                            // options={bankListQuery.data?.map((banks) => ({
                                            //     id: banks.bank_id,
                                            //     name: banks.bank_name,
                                            // }))}
                                            />
                                        )}
                                        rules={{
                                            required: true,
                                        }}
                                        control={control}
                                        />
                                    </Field>
                                </div>
                            </div>

                            <div className="flex justify-end mt-5">
                                <Button style={{ width: "250px" }} onClick={handleSubmit(createTransactionMut)}>
                                    Create
                                </Button> 
                            </div>
                        </FormContainer>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Transaction;