import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useFirestore = (collection, condition = null) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        let collectionRef = db.collection(collection).orderBy("createdAt");

        /**
         * condition
         * {
         *      fieldName: 'abc',
         *      operator: '==',
         *      compareValue: 'abc'
         * }
         */
        if (condition) {
            const { fieldName, operator, compareValue } = condition;

            if (!compareValue || !compareValue.length) return;
            collectionRef = collectionRef.where(
                fieldName,
                operator,
                compareValue
            );
        }

        const unsubscribed = collectionRef.onSnapshot((snapshot) => {
            const documents = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));

            setDocuments(documents);
        });

        // clean
        return () => {
            unsubscribed();
        };
    }, [collection, condition]);

    return documents;
};

export default useFirestore;
