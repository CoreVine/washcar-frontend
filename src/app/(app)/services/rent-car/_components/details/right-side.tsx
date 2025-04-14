"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Cars } from "@/types/models";

type Props = {
  car: Cars;
};

export default function RentCarDetailsRightSide({ car }: Props) {
  const t = useTranslations();

  // From Date
  const [dayFrom, setDayFrom] = useState("");
  const [monthFrom, setMonthFrom] = useState("");
  const [yearFrom, setYearFrom] = useState("");

  // To Date
  const [dayTo, setDayTo] = useState("");
  const [monthTo, setMonthTo] = useState("");
  const [yearTo, setYearTo] = useState("");

  const daysOptions = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
  const monthsOptions = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const yearsOptions = Array.from(
    { length: 10 },
    (_, i) => `${new Date().getFullYear() + i}`
  );

  const calculateDays = () => {
    if (dayFrom && monthFrom && yearFrom && dayTo && monthTo && yearTo) {
      const from = new Date(`${yearFrom}-${monthFrom}-${dayFrom}`);
      const to = new Date(`${yearTo}-${monthTo}-${dayTo}`);
      const diff = to.getTime() - from.getTime();
      const days = diff / (1000 * 60 * 60 * 24);
      return days >= 0 ? days : 0;
    }
    return 0;
  };

  const rentalDays = calculateDays();
  const total = rentalDays * (Number(car.price_per_day) || 3);

  const renderSelect = (
    value: string,
    setValue: (val: string) => void,
    options: string[],
    placeholder: string,
    width: string
  ) => (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className={`min-h-12 bg-gray-100 border-0 ${width}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <div className="xl:w-1/2 p-6 space-y-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex xl:flex-row flex-col xl:items-center gap-4">
            {/* dataeFrom  */}
            <section>
              <p className="text-gray-600">{t("dateFrom")}</p>
              <div className="flex">
                <input
                  type="text"
                  value={dayFrom}
                  onChange={(e) => setDayFrom(e.target.value)}
                  placeholder="DD"
                  className="w-16 h-12 bg-gray-100 rounded-l-lg text-center"
                />
                <Select value={monthFrom} onValueChange={setMonthFrom}>
                  <SelectTrigger className="w-20 min-h-12 border-0 bg-gray-100 rounded-none">
                    <SelectValue placeholder={t("month")} />
                  </SelectTrigger>
                  <SelectContent>
                    {monthsOptions.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input
                  type="text"
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                  placeholder="YYYY"
                  className="w-20 h-12 bg-gray-100 rounded-r-lg text-center"
                />
              </div>
            </section>

            <ArrowRight className="h-5 w-5 mt-5 text-gray-400 mx-2 hidden xl:block" />

            {/* dateTo  */}
            <section>
              <p className="text-gray-600">{t("dateTo")}</p>
              <div className="flex">
                <input
                  type="text"
                  value={dayTo}
                  onChange={(e) => setDayTo(e.target.value)}
                  placeholder="DD"
                  className="w-16 h-12 bg-gray-100 rounded-l-lg text-center"
                />
                <Select value={monthTo} onValueChange={setMonthTo}>
                  <SelectTrigger className="w-20 min-h-12 border-0 bg-gray-100 rounded-none">
                    <SelectValue placeholder={t("month")} />
                  </SelectTrigger>
                  <SelectContent>
                    {monthsOptions.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input
                  type="text"
                  value={yearTo}
                  onChange={(e) => setYearTo(e.target.value)}
                  placeholder="YYYY"
                  className="w-20 h-12 bg-gray-100 rounded-r-lg text-center"
                />
              </div>
            </section>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-600">{t("rentalDays")}</p>
          <p className="font-medium">{rentalDays}d</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-600">{t("dayPrice")}</p>
          <p className="font-medium">{car.price_per_day} KWD</p>
        </div>

        <div className="border-t border-dashed border-t-main-gray pt-4"></div>

        <div className="flex justify-between items-center">
          <p className="font-medium">{t("total")}</p>
          <p className="font-medium">{total.toFixed(2)} KWD</p>
        </div>
      </div>

      <Button className="w-full h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-lg">
        {t("addToCart")}
      </Button>
    </div>
  );
}
