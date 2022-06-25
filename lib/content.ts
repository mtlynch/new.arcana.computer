import type { Item, Type } from "./data";
import { fetchAllRecords } from "./airtable";
import { compile } from "components/Catalog/lib";
import { marked } from "marked";
import slugify from "./slugify";

const mungeRecord = async (record: any): Promise<Item> => {
  const summary = record.fields.Summary
    ? record.fields.Summary.replace(/\[\[/g, "~~").replace(/\]\]/g, "~~")
    : null;
  return {
    id: record.id,
    slug: slugify(record.fields.Name),
    title: record.fields.Name,
    type: record.fields.Type || null,
    author: record.fields.Author || null,
    rating: record.fields.Rating || null,
    date: record.fields.Date ? Date.parse(record.fields.Date) : null,
    description: summary ? await compile(summary) : null,
    htmlDescription: record.fields.Summary ? marked.parse(summary) : "",
    year: record.fields.Year || null,
    genre: record.fields.Genre ? record.fields.Genre[0] : null,
    image: record.fields.Image ? record.fields.Image[0].url : null,
  };
};

const fetch = async (type: Type): Promise<Item[]> => {
  const records = await fetchAllRecords("Content");
  const items = await Promise.all(
    records.map(async (record) => mungeRecord(record))
  );
  return items
    .filter((item) => item.type === type)
    .sort(function (a, b) {
      return b.date - a.date;
    });
};

export { fetch, mungeRecord };
