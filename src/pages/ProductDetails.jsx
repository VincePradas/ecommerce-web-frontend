import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../components/LoginModal";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import config from "../config";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination } from "swiper";
import Reviews from "../components/Reviews";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import "../style/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("authToken");

  useEffect(() => {
    fetch(`${config.API_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const discountedPrice = useMemo(() => {
    if (product.discountPercentage) {
      return product.price * (1 - product.discountPercentage / 100);
    }
    return null;
  }, [product.price, product.discountPercentage]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
    }).format(price);

  const handleAction = (action) => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
    } else {
      action();
    }
  };

  const handleCheckout = () => {
    setShowCheckoutModal(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckoutModal(false);
  };

  return (
    <div className="product-details container mx-auto px-4 py-6 md:px-6 md:py-12 font-slick">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8">
        <div className="w-full md:w-1/2">
          {loading ? (
            <Skeleton height={400} className="rounded-lg" />
          ) : product.media?.length > 0 ? (
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
              ref={swiperRef}
            >
              {product.media.map((mediaItem, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={mediaItem.url}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p>No media available for this product.</p>
          )}
        </div>

        <div className="w-full md:w-1/2">
          {loading ? (
            <>
              <Skeleton height={30} width="80%" className="mb-2" />
              <Skeleton count={3} height={20} className="mb-4" />
              <Skeleton height={20} width="60%" className="mb-4" />
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-base md:text-lg text-gray-600 mb-4">
                {product.description}
              </p>
              <p className="text-base md:text-lg text-gray-600 mb-4">
                <span className="font-bold">Category:</span> {product.category}
              </p>
              <p className="text-base md:text-lg text-gray-600 mb-4 flex items-center space-x-2">
                <span className="font-bold">Tags:</span>
                {product.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="border border-gray-300 px-2 py-1 rounded-full text-sm text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </p>
              <p className="text-base md:text-lg text-gray-600 mb-4 font-bold">
                Save {product.discountPercentage}% Off
              </p>
              <div className="flex items-center space-x-2">
                <span className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < product.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </span>
                <span className="text-gray-500">
                  {product.rating} ({product.reviews.length})
                </span>
              </div>

              <div className="mt-4">
                {discountedPrice ? (
                  <>
                    <p className="text-lg md:text-xl text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </p>
                    <p className="text-2xl md:text-2xl font-bold text-green-600">
                      {formatPrice(discountedPrice)}
                    </p>
                  </>
                ) : (
                  <p className="text-2xl md:text-2xl font-bold text-[#1F2232]">
                    {formatPrice(product.price)}
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <PrimaryButton onClick={handleCheckout}>Buy Now</PrimaryButton>
                <SecondaryButton
                  onClick={() =>
                    handleAction(() => {
                      alert("Added to Cart");
                    })
                  }
                >
                  Add to Cart
                </SecondaryButton>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex border rounded-lg border-gray-300">
        <div className="w-full max-w-md m-4 p-4 rounded-lg border border-gray-300">
          <div className="flex flex-col mb-6">
            <h1 className="text-2xl font-bold mb-3 text-gray-800">Coupon</h1>
            <input
              type="text"
              placeholder="Coupon Pin"
              className="border p-3 rounded-md border-gray-300 md:w-full focus:outline-none focus:ring-2 focus:ring-black transition duration-200"
            />
            <button className="bg-black text-white font-bold text-lg py-2 px-6 rounded-full transition duration-200 hover:bg-gray-800 mt-2">
              Apply
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-bold my-4 text-gray-800">Address</h1>
            <select className="border p-3 rounded-md border-gray-300 text-gray-700 md:w-full bg-white focus:outline-none focus:ring-2 focus:ring-black transition duration-200">
              <option value="" disabled selected>
                Set your address
              </option>
              <option value="address1">Address 1</option>
              <option value="address2">Address 2</option>
              <option value="newAddress">Add New Address</option>
            </select>
          </div>
        </div>
      </div>

      <Reviews productId={id} />

      {showCheckoutModal && (
        <CheckoutModal onClose={handleCloseCheckout} product={product} />
      )}
    </div>
  );
};

// Checkout Modal Component
const CheckoutModal = ({ onClose, product }) => {
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
    }).format(price);

  const handleCheckout = () => {
    alert("Checkout process started!");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50 backdrop-blur-sm font-poppins">
      <div className="bg-white p-6 rounded-lg shadow-lg w-100 mx-2">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Checkout {product.name} ?
        </h2>
        <p className="text-center mb-4 text-gray-600 font-slick">
          <span className="font-semibold">Total: </span>
          {formatPrice(product.price)}
        </p>

        <div className="flex justify-center gap-4">
          <button
            className="bg-black text-white font-semi py-2 px-4 rounded-md hover:bg-[#FF6F00]"
            onClick={handleCheckout}
          >
            Proceed
          </button>
          <button
            className="bg-gray-300 text-black font-semi py-2 px-4 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
