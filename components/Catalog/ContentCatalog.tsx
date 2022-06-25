import ColophonItem from "./ColophonItem";
import Catalog from "./Catalog";
import Icon from "../Icon";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import TextColophon from "./TextColophon";

const ContentColophon = ({ item }) => (
  <div>
    {item.image ? (
      <img src={item.image} alt={item.title} className="rounded-lg" />
    ) : (
      <TextColophon>No image.</TextColophon>
    )}
  </div>
);

const ContentCatalog = ({ title, rss, preamble, filters, items, name }) => {
  return (
    <Catalog
      title={title}
      rss={rss}
      preamble={preamble}
      filters={filters}
      items={items}
      lefthandComponent={(item) => <ContentColophon item={item} />}
      righthandComponent={(item) => (
        <div className="flex-1">
          <Link href={`/catalogs/${name}/${item.slug}`}>
            <div className="text-2xl font-bold cursor-pointer font-serif">
              {item.title}
            </div>
          </Link>
          {item.author && item.year && (
            <div className="text-lg uppercase text-gray-600">
              {item.author} • {item.year}
            </div>
          )}
          <div className="my-4 text-lg">
            {item.description && <MDXRemote {...item.description} />}
          </div>
          <div className="my-4 text-gray-700">
            {item.rating}/10 •{" "}
            {item.date && new Date(item.date).toLocaleDateString()}
          </div>

          {item.genre && (
            <div className="rounded-full bg-subtle text-sm inline-block px-3">
              <ColophonItem icon={<Icon.Tag />} value={item.genre} />
            </div>
          )}
        </div>
      )}
    />
  );
};

export default ContentCatalog;
