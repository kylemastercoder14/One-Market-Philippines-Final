/* eslint-disable @next/next/no-img-element */
"use client";

import { ChevronDown, ChevronRight } from 'lucide-react';
import React, { useState } from "react";

const CategoriesDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility

  return (
    <>
      <div
        className="relative group"
        onMouseEnter={() => setShowDropdown(true)} // Show dropdown on hover
        onMouseLeave={() => setShowDropdown(false)} // Hide dropdown on mouse leave
      >
        {/* Category Button */}
        <button className="px-4 flex items-center gap-2 py-2 rounded-2xl hover:bg-zinc-300/70 text-black text-sm transition-colors duration-300">
          <span>Categories</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 ${
              showDropdown ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown */}
        {showDropdown && (
          <div
            className="absolute top-full -right-60 mt-2 flex w-[800px] shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-out opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
            onMouseEnter={() => setShowDropdown(true)} // Keep dropdown visible when hovering over dropdown
            onMouseLeave={() => setShowDropdown(false)} // Hide dropdown on mouse leave
          >
            {/* Category Section */}
            <div className="w-full bg-white p-2 grid md:grid-cols-10 grid-cols-1 z-50 max-h-[70vh] overflow-y-auto">
              <div className="col-span-3 border-r pr-2">
                <div className="p-2 cursor-pointer hover:bg-zinc-300/70 rounded-lg flex items-center justify-between transition-colors duration-300">
                  <span className='text-sm'>Food and Beverage</span>
                  <ChevronRight className='w-3 h-3' />
                </div>
                <div className="p-2 cursor-pointer hover:bg-zinc-300/70 rounded-lg flex items-center justify-between transition-colors duration-300">
                  <span className='text-sm'>Food and Beverage</span>
                  <ChevronRight className='w-3 h-3' />
                </div>
                <div className="p-2 cursor-pointer hover:bg-zinc-300/70 rounded-lg flex items-center justify-between transition-colors duration-300">
                  <span className='text-sm'>Food and Beverage</span>
                  <ChevronRight className='w-3 h-3' />
                </div>
              </div>
              <div className="col-span-7 ml-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. At tempore laborum et impedit quas, esse hic officia animi tenetur, quam delectus expedita autem illum praesentium voluptate. Repudiandae cupiditate provident ipsum, laudantium reprehenderit ad animi, neque quos nobis iste maiores sint corporis necessitatibus autem veniam, sit explicabo vitae quaerat earum vel! Suscipit repellat cum quas quaerat quasi nisi dolore sint, pariatur, facilis expedita earum cupiditate perspiciatis magni amet ipsam. Vitae et fuga enim, incidunt modi officia at tempora itaque eveniet eligendi veniam sint iusto ad, delectus perferendis architecto dolorem molestias quaerat! Aliquam est et veritatis magnam minima impedit at deserunt magni ad quibusdam neque asperiores placeat inventore nobis, harum cupiditate tempore ea, aspernatur earum qui repellat possimus. Nostrum itaque aspernatur nesciunt quod deserunt est natus tempora. Sunt odit quae fugiat aliquam? Hic, quas. Incidunt pariatur doloremque non nihil, aut ipsam harum corporis animi, porro deleniti, officiis neque architecto soluta. Laboriosam quae, possimus dolor veniam voluptatem consequuntur nesciunt harum eveniet. Beatae sequi ea, tempore, repellendus tempora maiores quod non reprehenderit magnam vel natus expedita recusandae accusamus eveniet adipisci? Esse, corrupti provident quae natus quas soluta, nostrum voluptates adipisci facilis voluptas tempora rerum distinctio neque voluptatum rem fugiat recusandae inventore perspiciatis perferendis dignissimos ut! Quisquam ut nam quam sapiente officiis eius qui asperiores? Magni ullam suscipit voluptate laudantium quae dolore quod reiciendis molestias, labore eum debitis at esse ipsum neque quaerat minus voluptates, in, quam asperiores magnam possimus qui? Fugit sit ipsa voluptatibus veritatis possimus, vel libero, officia consectetur quam exercitationem est doloribus asperiores. Officia a minima nesciunt explicabo optio illum nobis accusantium alias libero commodi eaque quidem vitae beatae quasi, mollitia et est, omnis, assumenda doloribus aliquid fugiat accusamus aperiam. Dolor alias veritatis repudiandae quidem fuga similique voluptatem inventore quod corporis qui, dolorum praesentium fugit hic at quis consequatur impedit dolore sequi. Repellendus quia excepturi, corporis natus recusandae consequuntur officiis. Nemo incidunt vel enim laudantium nihil recusandae necessitatibus commodi, maiores nesciunt quod quam voluptatum error corporis fugiat cupiditate repudiandae natus, est provident accusantium! Dignissimos, sequi itaque iure esse voluptate eos laborum facilis quis! Qui repellat tenetur repudiandae, similique omnis, natus error nostrum assumenda reiciendis odio nobis debitis officia voluptate pariatur, provident placeat ut deleniti quibusdam. Incidunt ducimus similique debitis deleniti animi harum et, distinctio reprehenderit dignissimos ipsam, vel architecto labore nulla, illo totam itaque at consectetur maxime. Dolorem molestiae autem qui cumque, nostrum nemo sint cupiditate, eligendi iste id atque nam provident? Amet rem nostrum quos laborum, dolorum fugit totam fuga blanditiis facere voluptatum, illum dolorem et explicabo iusto itaque pariatur aspernatur error aperiam mollitia impedit. Enim excepturi earum nam. Doloribus, temporibus architecto ipsa, laborum facilis ipsum nisi aut in neque quae tempore iste enim nihil minima cumque obcaecati adipisci maiores voluptatem. Repudiandae deleniti quisquam omnis ipsam vitae incidunt, consequatur, maiores veritatis excepturi et iusto possimus unde! Totam aliquam quis itaque. Illum, culpa eveniet asperiores sit accusamus officiis eligendi, totam rem tenetur deserunt minima voluptas facere voluptatum aspernatur officia quaerat animi nihil placeat? Similique dolorem voluptas quae saepe earum tenetur molestiae neque.</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoriesDropdown;
