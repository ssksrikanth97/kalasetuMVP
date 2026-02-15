(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/admin/inventory/new/product-form.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "backLink": "product-form-module__htG47G__backLink",
  "cancelBtn": "product-form-module__htG47G__cancelBtn",
  "card": "product-form-module__htG47G__card",
  "cardTitle": "product-form-module__htG47G__cardTitle",
  "checkbox": "product-form-module__htG47G__checkbox",
  "checkboxGroup": "product-form-module__htG47G__checkboxGroup",
  "formGrid": "product-form-module__htG47G__formGrid",
  "helperText": "product-form-module__htG47G__helperText",
  "imageUploadBox": "product-form-module__htG47G__imageUploadBox",
  "input": "product-form-module__htG47G__input",
  "inputGroup": "product-form-module__htG47G__inputGroup",
  "label": "product-form-module__htG47G__label",
  "select": "product-form-module__htG47G__select",
  "submitBtn": "product-form-module__htG47G__submitBtn",
  "textarea": "product-form-module__htG47G__textarea",
  "uploadIcon": "product-form-module__htG47G__uploadIcon",
});
}),
"[project]/src/app/admin/dashboard/admin.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actionButton": "admin-module__a3EyKq__actionButton",
  "activityContent": "admin-module__a3EyKq__activityContent",
  "activityIcon": "admin-module__a3EyKq__activityIcon",
  "activityItem": "admin-module__a3EyKq__activityItem",
  "activityTime": "admin-module__a3EyKq__activityTime",
  "avatar": "admin-module__a3EyKq__avatar",
  "cardHeader": "admin-module__a3EyKq__cardHeader",
  "cardTitle": "admin-module__a3EyKq__cardTitle",
  "contentCard": "admin-module__a3EyKq__contentCard",
  "dashboardContainer": "admin-module__a3EyKq__dashboardContainer",
  "dateBadge": "admin-module__a3EyKq__dateBadge",
  "header": "admin-module__a3EyKq__header",
  "logoContainer": "admin-module__a3EyKq__logoContainer",
  "logoText": "admin-module__a3EyKq__logoText",
  "mainContent": "admin-module__a3EyKq__mainContent",
  "navIcon": "admin-module__a3EyKq__navIcon",
  "navItem": "admin-module__a3EyKq__navItem",
  "navItemActive": "admin-module__a3EyKq__navItemActive",
  "navLinks": "admin-module__a3EyKq__navLinks",
  "sectionGrid": "admin-module__a3EyKq__sectionGrid",
  "sidebar": "admin-module__a3EyKq__sidebar",
  "statCard": "admin-module__a3EyKq__statCard",
  "statHeader": "admin-module__a3EyKq__statHeader",
  "statIcon": "admin-module__a3EyKq__statIcon",
  "statTitle": "admin-module__a3EyKq__statTitle",
  "statTrend": "admin-module__a3EyKq__statTrend",
  "statValue": "admin-module__a3EyKq__statValue",
  "statsGrid": "admin-module__a3EyKq__statsGrid",
  "statusApproved": "admin-module__a3EyKq__statusApproved",
  "statusBadge": "admin-module__a3EyKq__statusBadge",
  "statusPending": "admin-module__a3EyKq__statusPending",
  "table": "admin-module__a3EyKq__table",
  "tableContainer": "admin-module__a3EyKq__tableContainer",
  "titleGroup": "admin-module__a3EyKq__titleGroup",
  "trendDown": "admin-module__a3EyKq__trendDown",
  "trendUp": "admin-module__a3EyKq__trendUp",
  "userProfile": "admin-module__a3EyKq__userProfile",
});
}),
"[project]/src/app/admin/inventory/edit/[id]/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditProduct
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/firebase.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$storage$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/storage/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/storage/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/admin/inventory/new/product-form.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/admin/dashboard/admin.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
const CATEGORIES_DEFAULT = [
    {
        id: 'musical-instruments',
        name: 'Musical Instruments'
    },
    {
        id: 'classical-dance-items',
        name: 'Classical Dance Items'
    },
    {
        id: 'return-gifts',
        name: 'Return Gifts'
    },
    {
        id: 'mementos-awards',
        name: 'Mementos / Awards'
    },
    {
        id: 'traditional-wear',
        name: 'Traditional Wear'
    },
    {
        id: 'books',
        name: 'Books & Learning'
    }
];
function EditProduct() {
    _s();
    const { user, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const { id: productId } = params;
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [productLoading, setProductLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [imagePreview, setImagePreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [existingImageUrl, setExistingImageUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditProduct.useEffect": ()=>{
            if (!productId) return;
            const fetchProduct = {
                "EditProduct.useEffect.fetchProduct": async ()=>{
                    setProductLoading(true);
                    try {
                        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'products', productId);
                        const docSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(docRef);
                        if (docSnap.exists()) {
                            const data = docSnap.data();
                            setFormData({
                                productName: data.productName || '',
                                categoryId: data.categoryId || '',
                                subCategory: data.subCategory || '',
                                shortDescription: data.shortDescription || '',
                                description: data.description || '',
                                tags: Array.isArray(data.tags) ? data.tags.join(', ') : '',
                                skuCode: data.skuCode || '',
                                brandOrMaker: data.brandOrMaker || '',
                                artisanStory: data.artisanStory || '',
                                saleType: data.saleType || 'Sale',
                                price: data.price || '',
                                rentalPricePerDay: data.rentalPricePerDay || '',
                                discountPercentage: data.discountPercentage || 0,
                                gstApplicable: data.gstApplicable || false,
                                gstPercentage: data.gstPercentage || 18,
                                stockQuantity: data.stockQuantity || 10,
                                lowStockAlertLimit: data.lowStockAlertLimit || 5,
                                availabilityStatus: data.availabilityStatus || 'In Stock',
                                weight: data.weight || '',
                                dimensions: data.dimensions || '',
                                shippingAvailable: data.shippingAvailable || true,
                                shippingCharges: data.shippingCharges || 0,
                                returnPolicyDays: data.returnPolicyDays || 7,
                                mainImage: null
                            });
                            if (data.mainImage) {
                                setExistingImageUrl(data.mainImage);
                                setImagePreview(data.mainImage);
                            }
                        } else {
                            console.error("No such product!");
                            router.push('/admin/inventory');
                        }
                    } catch (error) {
                        console.error("Error fetching product:", error);
                    } finally{
                        setProductLoading(false);
                    }
                }
            }["EditProduct.useEffect.fetchProduct"];
            fetchProduct();
        }
    }["EditProduct.useEffect"], [
        productId,
        router
    ]);
    const handleChange = (e)=>{
        const { name, value, type, checked } = e.target;
        setFormData((prev)=>({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
    };
    const handleFileChange = (e)=>{
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData((prev)=>({
                    ...prev,
                    mainImage: file
                }));
            setImagePreview(URL.createObjectURL(file));
        }
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!formData) return;
        setLoading(true);
        try {
            let mainImageUrl = existingImageUrl;
            if (formData.mainImage && formData.mainImage instanceof File) {
                const storageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"], `products/${Date.now()}_${formData.mainImage.name}`);
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadBytes"])(storageRef, formData.mainImage);
                mainImageUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDownloadURL"])(storageRef);
            }
            const productRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firebase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'products', productId);
            const updatedData = {
                ...formData,
                tags: formData.tags.split(',').map((t)=>t.trim()).filter(Boolean),
                price: parseFloat(formData.price) || 0,
                stockQuantity: parseInt(formData.stockQuantity) || 0,
                shippingCharges: parseFloat(formData.shippingCharges) || 0,
                mainImage: mainImageUrl,
                updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])(productRef, updatedData);
            router.push('/admin/inventory');
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product: ' + error.message);
        } finally{
            setLoading(false);
        }
    };
    if (productLoading || !formData) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                lineNumber: 145,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
            lineNumber: 144,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dashboardContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidebar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoContainer,
                        style: {
                            padding: '0 1rem'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'relative',
                                width: '100%',
                                height: '40px'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/logo.png",
                                alt: "KalaSetu Admin",
                                fill: true,
                                style: {
                                    objectFit: 'contain',
                                    objectPosition: 'left'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                lineNumber: 155,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                            lineNumber: 154,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                        lineNumber: 153,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navLinks,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/dashboard",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem,
                                children: "Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                lineNumber: 159,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/users",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem,
                                children: "Users"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                lineNumber: 160,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/inventory",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItemActive}`,
                                children: "Inventory"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                lineNumber: 161,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/orders",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem,
                                children: "Orders"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                lineNumber: 162,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin/bookings",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem,
                                children: "Bookings"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                lineNumber: 163,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: logout,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navItem,
                                style: {
                                    marginTop: 'auto'
                                },
                                children: "Logout"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                lineNumber: 164,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                        lineNumber: 158,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                lineNumber: 152,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$dashboard$2f$admin$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mainContent,
                style: {
                    background: '#fcfcfc'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    style: {
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '2rem'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerActions,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/admin/inventory",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backLink,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "←"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                    lineNumber: 173,
                                                    columnNumber: 87
                                                }, this),
                                                " Back"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                            lineNumber: 173,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            style: {
                                                fontSize: '1.75rem',
                                                fontWeight: 'bold'
                                            },
                                            children: "Edit Product"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                            lineNumber: 174,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                    lineNumber: 172,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '1rem'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: loading,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].submitBtn,
                                        children: loading ? 'Saving...' : 'Save Changes'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                        lineNumber: 177,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                    lineNumber: 176,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                            lineNumber: 171,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGrid,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardTitle,
                                                    children: "Basic Information"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                    lineNumber: 185,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputGroup,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                            children: "Product Name *"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                            lineNumber: 187,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            name: "productName",
                                                            value: formData.productName,
                                                            onChange: handleChange,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                                                            required: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                            lineNumber: 188,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                    lineNumber: 186,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputGroup,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                            children: "Description"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                            lineNumber: 191,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                            name: "description",
                                                            value: formData.description,
                                                            onChange: handleChange,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textarea,
                                                            rows: "5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                            lineNumber: 192,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                    lineNumber: 190,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                            lineNumber: 184,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardTitle,
                                                    children: "Pricing"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                    lineNumber: 197,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].row2,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputGroup,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                                    children: "Selling Price (₹) *"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                                    lineNumber: 200,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    name: "price",
                                                                    value: formData.price,
                                                                    onChange: handleChange,
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                                                                    required: true
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                                    lineNumber: 201,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                            lineNumber: 199,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputGroup,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                                    children: "Discount (%)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                                    lineNumber: 204,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    name: "discountPercentage",
                                                                    value: formData.discountPercentage,
                                                                    onChange: handleChange,
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                                    lineNumber: 205,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                            lineNumber: 203,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                    lineNumber: 198,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                            lineNumber: 196,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardTitle,
                                                    children: "Inventory"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                    lineNumber: 211,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].row3,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputGroup,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                                    children: "SKU"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                                    lineNumber: 214,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    name: "skuCode",
                                                                    value: formData.skuCode,
                                                                    onChange: handleChange,
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                                    lineNumber: 215,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                            lineNumber: 213,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputGroup,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                                    children: "Stock Quantity"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                                    lineNumber: 218,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "number",
                                                                    name: "stockQuantity",
                                                                    value: formData.stockQuantity,
                                                                    onChange: handleChange,
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                                    lineNumber: 219,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                            lineNumber: 217,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                    lineNumber: 212,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                            lineNumber: 210,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                    lineNumber: 183,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardTitle,
                                                    children: "Organization"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                    lineNumber: 228,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputGroup,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                            children: "Category *"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                            lineNumber: 230,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            name: "categoryId",
                                                            value: formData.categoryId,
                                                            onChange: handleChange,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].select,
                                                            required: true,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "Select Category"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                                    lineNumber: 232,
                                                                    columnNumber: 41
                                                                }, this),
                                                                CATEGORIES_DEFAULT.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: c.id,
                                                                        children: c.name
                                                                    }, c.id, false, {
                                                                        fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                                        lineNumber: 233,
                                                                        columnNumber: 70
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                            lineNumber: 231,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                    lineNumber: 229,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputGroup,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                            children: "Tags"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                            lineNumber: 237,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            name: "tags",
                                                            value: formData.tags,
                                                            onChange: handleChange,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                            lineNumber: 238,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                    lineNumber: 236,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                            lineNumber: 227,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardTitle,
                                                    children: "Product Image"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                    lineNumber: 243,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputGroup,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imageUploadBox,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "file",
                                                                onChange: handleFileChange,
                                                                accept: "image/*",
                                                                style: {
                                                                    display: 'none'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                                lineNumber: 246,
                                                                columnNumber: 41
                                                            }, this),
                                                            imagePreview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: imagePreview,
                                                                alt: "Preview",
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].previewImage
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                                lineNumber: 248,
                                                                columnNumber: 45
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$admin$2f$inventory$2f$new$2f$product$2d$form$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].uploadPlaceholder,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "📷"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                                        lineNumber: 250,
                                                                        columnNumber: 87
                                                                    }, this),
                                                                    " Click to upload"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                                lineNumber: 250,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                        lineNumber: 245,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                                    lineNumber: 244,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                            lineNumber: 242,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                                    lineNumber: 226,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                            lineNumber: 181,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                    lineNumber: 169,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
                lineNumber: 168,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/inventory/edit/[id]/page.js",
        lineNumber: 151,
        columnNumber: 9
    }, this);
}
_s(EditProduct, "AVk8gD7Hw5GX4EgTK8L6FaUxuOg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = EditProduct;
var _c;
__turbopack_context__.k.register(_c, "EditProduct");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_admin_6f9601f0._.js.map