export const listChapters = async (mangaId) => {
  const response = await fetch(`https://kakarot.cuutruyen.net/api/v1/chapter_listings/${mangaId}`)
  const data = await response.json()
  return JSON.parse(data.data.attributes.chapters)
}
