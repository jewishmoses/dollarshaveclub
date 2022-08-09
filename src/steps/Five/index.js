import { useEffect, useContext, useState, useRef } from "react";
import { FaMinus as MinusIcon, FaPlus as PlusIcon } from "react-icons/fa";
import AppContext from "../../contexts/app";
import { useTranslation } from "react-i18next";
import defaultProducts from './products.json';

const Step = () => {

    const { stepOneOptions, stepTwoOptions, stepThreeOptions, stepFourOptions } = useContext(AppContext);
    const [products, setProducts] = useState(defaultProducts);
    const [total, setTotal] = useState(0);
    const { t } = useTranslation();
    const stepRef = useRef(null);

    const getRecommendedProducts = () => {

        let checkedOptions = [];

        checkedOptions = [...checkedOptions, ...stepOneOptions.filter(option => option.checked)];
        checkedOptions = [...checkedOptions, ...stepTwoOptions.filter(option => option.checked)];
        checkedOptions = [...checkedOptions, ...stepThreeOptions.filter(option => option.checked)];
        checkedOptions = [...checkedOptions, ...stepFourOptions.filter(option => option.checked)];

        const shouldRedirect = checkedOptions.find(option => option.name === "I don't shave");

        if (shouldRedirect) {

            // redirect

        }

        const dailyBasis = checkedOptions.find(option => option.name === "Daily");

        if (dailyBasis) {

            products.forEach(product => {
                product.quantity = product.quantity * 2;
            });

        }

        const dryness = checkedOptions.find(option => option.name === "Dryness");

        if (dryness) {

            products[3].quantity = 1;

        }

        return products.filter(product => product.quantity > 0);

    };

    useEffect(() => {

        const products = getRecommendedProducts();
        setProducts(products);

    }, []);

    useEffect(() => { calculateTotal(); }, [products])

    const calculateTotal = () => {

        let total = 0;

        products.forEach(product => {
            total += product.price * product.quantity;
        });

        setTotal(total);

    };

    const updateItemQuantity = (id, quantity) => {

        const product = products.find(product => product.id === id);
        product.quantity += quantity;
        setProducts([...products]);

    };

    useEffect(() => { stepRef.current.scrollIntoView()  }, []);

    return (
        <div ref={stepRef} className="min-h-screen text-center p-10">

            <h3 className="text-3xl">{t("Review your plan below.")}</h3>
            <small className="text-1xl">{t("(We think we nailed it.)")}</small>

            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">

                {products.map((item) => (

                    <div class="bg-white p-5 max-w-sm rounded overflow-hidden shadow-lg">
                        <img class="object-contain h-48 w-96" src={item.image} alt="Sunset in the mountains" />
                        <div class="px-6 py-4">
                            <div class="font-bold text-xl mb-2">{t(item.name)}</div>
                            <small>{item.price}₪</small>
                            <hr className="my-2"/>
                            <div className="">
                                <div class="flex items-center">

                                    <button onClick={() => updateItemQuantity(item.id, 1)} class="inline-flex items-center p-1 text-sm font-medium text-gray-500 rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                                        <PlusIcon />
                                    </button>

                                    <div>
                                        <input type="number" class="mx-1 bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1" value={item.quantity} />
                                    </div>

                                    <button onClick={() => updateItemQuantity(item.id, -1)} class="inline-flex items-center p-1 text-sm font-medium text-gray-500 rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                                        <MinusIcon />
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>

            <div className="bg-white w-2/4 rounded p-10 mb-10">
                <span className="text-2xl">Total price: {total}₪</span>
            </div>

        </div>
    )

};

export default Step;