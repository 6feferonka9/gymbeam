'use client';

// this component can be reused for any filtering if the API response is the same

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ApiCategoryResponse, ApiFilterMultiselect } from "@/types/apiResponses";
import { useState } from "react";
import { Loader2 } from "lucide-react"
import {
  DrawerClose,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import Select from 'react-select';

function InternalMultiselect({ filter, searchValues }: { filter: ApiFilterMultiselect, searchValues: string | string[] }) {
  const formatOptionsForSelect = filter.options.map(item => ({ value: item.value, label: item.name }));

  const formatDefaultValues = () => {
    if (searchValues === '' || searchValues === undefined) {
      return;
    }

    if (Array.isArray(searchValues)) {
      return searchValues.map(value => ({ value: value, label: filter.options.find(item => item.value === value)?.name }))
    }

    return { value: searchValues, label: filter.options.find(item => item.value === searchValues)?.name }
  }

  return (
    <Select id={filter.code}
      instanceId={filter.code}
      defaultValue={formatDefaultValues()}
      name={filter.code}
      className="w-[170px]"
      placeholder={filter.name}
      key={filter.code}
      isMulti
      options={formatOptionsForSelect}
    >
    </Select>
  )
}

function InternalCheckbox({code, defaultValue, label}: {code: string, defaultValue: string | string[], label: string} ) {
  return (
    <label htmlFor={code} className="flex gap-2 items-center">
      {label}
      <Checkbox defaultChecked={defaultValue === 'on' ? true : false} name={code} id={code}></Checkbox>
    </label>
  )
}

export default function CategoryFiltering({ categoryData, searchParams }: { categoryData: ApiCategoryResponse['filters'], searchParams: Record<string, string | string[]> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <DrawerHeader>
        <DrawerTitle>Filters</DrawerTitle>
        <form className="flex flex-wrap gap-2" onSubmit={() => { setIsSubmitting(true) }}>
          {categoryData.map(filter => {
            if (filter.type === 'multiselect') {
              return <InternalMultiselect filter={filter} searchValues={searchParams[filter.code]} key={filter.code}></InternalMultiselect>
            }

            if (filter.type === 'checkbox') {
              return <InternalCheckbox key={filter.code} label={filter.name} defaultValue={searchParams[filter.code]} code={filter.code}></InternalCheckbox>
            }

            // if there is something unhandled returned from server, ignore it
            return null;
          })}

          <div className="flex flex-row gap-2">
            <Button type="submit">{isSubmitting ? <><Loader2 className="animate-spin" /> Loading..</> : 'Search'}</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </div>
        </form>
      </DrawerHeader>
    </>
  )
}