import React from "react";
import Link from "next/link";
import Image from "next/image";

interface FeaturedProduct {
  id: string;
  categoryId: string;
  name: string;
  image: string;
}

const FeaturedProducts: React.FC = () => {
  // 7 featured products from different categories using images from 'new' folder
  const featuredProducts: FeaturedProduct[] = [
    {
      id: "v-a-series-electro-actuated",
      categoryId: "electro-actuated-pumps",
      name: "Metering pump",
      image: "/new/Milton Roy Electro Actuated Diaphragm Pumps/V-A-Series-Electro-Magnetically-Actuated-Diaphragm-Dosing-Pump.jpg"
    },
    {
      id: "pnm-series-plunger",
      categoryId: "plunger-pumps",
      name: "High pressure plunger reciprocating pump",
      image: "/new/Milton Roy Packed Plunger Dosing Pumps/PNM-Series-Packed-Plunger-Dosing-Pump.jpg"
    },
    {
      id: "b105-series-hydraulic",
      categoryId: "hydraulic-actuated-pumps",
      name: "Process hydraulic diaphragm pump",
      image: "/new/Milton Roy Hydraulically Actuated Diaphragm Pumps/B105-Series-Hydraulically-Actuated-Diaphragm-Type-Dosing-Pump.jpg"
    },
    {
      id: "m-roy-series-abhp",
      categoryId: "hydraulic-actuated-pumps",
      name: "Hydraulic hose diaphragm pump",
      image: "/new/Milton Roy Hydraulically Actuated Diaphragm Pumps/m-Roy-Series-A-B-H-P-Hydraulically-Actuated-Diaphragm-Type-Dosing-Pump.jpg"
    },
    {
      id: "gb-series-mechanical",
      categoryId: "mechanical-actuated-pumps",
      name: "Multi-conjoined metering pump",
      image: "/new/Milton Roy Actuated Diaphragm Type Dosing Pumps/GB-Series-Mechanically-Actuated-Diaphragm-Type-Dosing-Pump.jpg"
    },
    {
      id: "b-series-electro-actuated",
      categoryId: "electro-actuated-pumps",
      name: "Pneumatic/electric diaphragm pumps",
      image: "/new/Milton Roy Electro Actuated Diaphragm Pumps/B-Series-Electro-Magnetically-Actuated-Diaphragm-Type-Dosing-Pump.jpg"
    },
    {
      id: "electronic-capacity-controller",
      categoryId: "pump-accessories",
      name: "Dosing device",
      image: "/new/Milton Roy Pump Accessories/Electronic-Capacity-Controller.jpg"
    }
  ];

  return (
    <section className="py-16 bg-brand-50/40">
      <div className="container mx-auto px-4">
        {/* Products Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group flex flex-col items-center text-center"
            >
              {/* Product Image */}
              <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mb-4 bg-gray-50 rounded-full flex items-center justify-center overflow-hidden group-hover:shadow-lg transition-all duration-300">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 96px, (max-width: 1024px) 112px, 128px"
                />
              </div>

              {/* Product Name */}
              <h3 className="text-sm md:text-base font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                {product.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
