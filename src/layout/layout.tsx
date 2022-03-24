import { Skeleton } from "@mantine/core";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../modules/header/components/header";

export const Layout = () => {


    return (
        <>
            {/* header */}
            <Suspense fallback={ <Skeleton height={50} radius="sm" /> }>
                <Header/>
            </Suspense>

            {/* body */}
            <Suspense fallback={ <Skeleton height={50} radius="sm" /> }>
                <Outlet />
            </Suspense>
            
        </>
    );
}
