export default function sorter(module, s) {
  if (s.__replace) {
    module?.sortByColumn(s.sortBy, s.order, s.limit);
  } else {
    module?.fetch(s);
  }
}
