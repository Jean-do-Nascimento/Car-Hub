"use client";

import Image from 'next/image'
import { useState, Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { SearchManufacturerProps } from '@/types'
import { manufacturers } from '@/constants'

const SearchManufacturer = ({ selected, setSelected }: SearchManufacturerProps) => {
    const [query, setQuery] = useState('');

    const filteredManufacturers =
        query === ""
            ? manufacturers
            : manufacturers.filter((item) => (
                item.toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(query.toLowerCase().replace(/\s+/g, ""))
            ))

    return (
        <div className="searchmanufacturer">
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative w-full">
                    <Combobox.Button className="absolute top-[14px]">
                        <Image
                            src="/car-logo.svg"
                            width={20}
                            height={20}
                            className="ml-4"
                            alt="Car Logo"
                        />
                    </Combobox.Button>

                    <Combobox.Input
                        className="search-manufacturer__input"
                        placeholder='Volkswagen'
                        displayValue={(manufacturer: string) => manufacturer}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="Oopacity-100"
                        leaveTo="opacity-0"
                    >
                        <Combobox.Options>
                            {filteredManufacturers.map((item) => (
                                <Combobox.Option
                                    key={item}
                                    className={({ active }) =>
                                        `relative search-manufacturer__option
                                          ${active ? 'bg-primary-blue text-white'
                                            : 'text-gray-900'}`
                                    }
                                    value={item}
                                >
                                    {({ selected, active }) => (
                                        <>
                                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                            {item}
                                        </span>

                                        {selected ? (
                                            <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-pribg-primary-purple"}`}>

                                            </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            )
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

export default SearchManufacturer