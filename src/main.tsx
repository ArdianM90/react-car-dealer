import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css'
import App from './App'
import { Layout } from "./layout/Layout";
import { ItemPage } from "./pages/item/ItemPage";
import { ItemsPage } from "./pages/item/ItemsPage";
import { EmployeePage } from "./pages/employee/EmployeePage";
import { EmployeesPage } from "./pages/employee/EmployeesPage";
import { OfferPage } from "./pages/offer/OfferPage";
import { OffersPage } from "./pages/offer/OffersPage";
import { OfferCreatorPage } from "./pages/admin-pages/OfferCreatorPage";
import { OffersManagerPage } from "./pages/admin-pages/OffersManagerPage"
import { ContactPage } from "./pages/contact/ContactPage";
import { AboutUsPage } from "./pages/about-us/AboutUsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom"; 

const root = document.getElementById("root");

if (root) {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<App />} />
                    </Route>
                    <Route path="/offer/:id" element={<Layout />}>
                        <Route index element={<OfferPage />} />
                    </Route>
                    <Route path="/offers/:type" element={<Layout />}>
                        <Route index element={<OffersPage />} />
                    </Route>
                    <Route path="/add-offer" element={<Layout />}>
                        <Route index element={<OfferCreatorPage />} />
                    </Route>
                    <Route path="/edit-offer/:id" element={<Layout />}>
                        <Route index element={<OfferCreatorPage />} />
                    </Route>
                    <Route path="/manage-offers" element={<Layout />}>
                        <Route index element={<OffersManagerPage />} />
                    </Route>
                    <Route path="/contact" element={<Layout />}>
                        <Route index element={<ContactPage />} />
                    </Route>
                    <Route path="/about-us" element={<Layout />}>
                        <Route index element={<AboutUsPage />} />
                    </Route>
                    <Route path="/towar" element={<Layout />}>
                        <Route index element={<ItemPage />} />
                    </Route>
                    <Route path="/towary" element={<Layout />}>
                        <Route index element={<ItemsPage />} />
                    </Route>
                    <Route path="/employee" element={<Layout />}>
                        <Route index element={<EmployeePage />} />
                    </Route>
                    <Route path="/employees" element={<Layout />}>
                        <Route index element={<EmployeesPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </React.StrictMode>)
} else {
    console.error("Nie znaleziono elementu root w DOM.");
}
