import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Product Image */}
            <div className="h-96 w-full bg-gray-100">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="p-6">
              <h1 className="text-3xl font-semibold text-gray-800">{product.title}</h1>
              <p className="mt-4 text-lg text-gray-600">{product.description}</p>

              <div className="mt-6 space-y-4">
                <p className="text-sm text-gray-700">
                  <strong>Category:</strong> {product.category}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Brand:</strong> {product.brand}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>SKU:</strong> {product.sku}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Weight:</strong> {product.weight}g
                </p>
                {product.dimensions && (
                  <p className="text-sm text-gray-700">
                    <strong>Dimensions:</strong> {product.dimensions.width} x{" "}
                    {product.dimensions.height} x {product.dimensions.depth} mm
                  </p>
                )}
                <p className="text-sm text-gray-700">
                  <strong>Warranty:</strong> {product.warrantyInformation}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Shipping:</strong> {product.shippingInformation}
                </p>
              </div>

              {/* Pricing and Rating */}
              <div className="mt-6 flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                <div className="flex items-center text-yellow-500">
                  <span className="text-lg font-semibold">⭐ {product.rating} / 5</span>
                </div>
              </div>

              {/* Availability */}
              <div className="mt-4">
                <span
                  className={`text-sm font-semibold ${
                    product.availabilityStatus === "Low Stock" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  Availability: {product.availabilityStatus}
                </span>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-6">
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Product Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="p-6 mt-6 bg-gray-50 border-t border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">Tags</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-sm text-white bg-gray-500 py-1 px-3 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="p-6 mt-6 bg-gray-50 border-t border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">Customer Reviews</h2>
              <div className="mt-4 space-y-4">
                {product.reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <div className="flex items-center">
                      <span className="text-sm font-semibold text-gray-800">{review.reviewerName}</span>
                      <span className="ml-2 text-sm text-gray-600">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-500">
                        {"⭐".repeat(review.rating)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
