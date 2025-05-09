import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import { Layout } from "./layout/Layout.js";
import { ItemPage } from "./pages/item/ItemPage.js";
import { ItemsPage } from "./pages/item/ItemsPage.js";
import { EmploeePage } from "./pages/employee/EmployeePage.js";
import { EmploeesPage } from "./pages/employee/EmployeesPage.js";
import { OfferPage } from "./pages/offer/OfferPage.js";
import { OffersPage } from "./pages/offer/OffersPage.js";
import { OfferCreatorPage } from "./pages/admin-pages/OfferCreatorPage.js";
import { OffersManagerPage } from "./pages/admin-pages/OffersManagerPage.js"
import { ContactPage } from "./pages/contact/ContactPage.js";
import { AboutUsPage } from "./pages/about-us/AboutUsPage.js";
import { BrowserRouter, Route, Routes } from "react-router-dom"; 

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {
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
                    <Route path="/pracownik" element={<Layout />}>
                        <Route index element={<EmploeePage />} />
                    </Route>
                    <Route path="/pracownicy" element={<Layout />}>
                        <Route index element={<EmploeesPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        }
    </React.StrictMode>
);
