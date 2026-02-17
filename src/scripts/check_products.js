const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('../../serviceAccountKey.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

async function checkProducts() {
    try {
        const productsSnapshot = await db.collection('products').get();
        if (productsSnapshot.empty) {
            console.log('No products found in the "products" collection.');
        } else {
            console.log(`Found ${productsSnapshot.size} products:`);
            productsSnapshot.forEach(doc => {
                console.log(`- ID: ${doc.id}, Name: ${doc.data().productName}, Status: ${doc.data().status}, isApproved: ${doc.data().isApproved}`);
            });
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

checkProducts();
