import BookComponent from '@/components/Book.component';
import { IBook, IBookResponse } from '@/types/book.type';
import { Center, Container, Flex, Group, Loader, SimpleGrid, Text, TextInput, Title } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks';
import axios, { AxiosError } from 'axios';
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home() {
  const [title, setBookTitle] = useState('');
  const [debouncedValue] = useDebouncedValue(title, 50);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<IBook[]>([])

  useEffect(() => {
    if (debouncedValue.length > 0) {
      (async function getBooks() {
        setLoading(true);
        try {
          const response = await axios.get<IBookResponse>(`https://openlibrary.org/search.json?q=${debouncedValue}`);
          console.log(response.data);
          // only 100 books to display
          const _books = response.data.docs.slice(0, 100);
          setBooks(_books);
        } catch (error) {
          setError("Something went wrong")
        } finally {
          setLoading(false);
        }
      }())
    }
  }, [debouncedValue]);

  return (
    <>
      <Head>
        <title>Book App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container py={30}>
        <Title>Search Book</Title>

        {/* Book Input */}
        <TextInput mt={15}
          placeholder="Type book name..."
          label="Book Title"
          withAsterisk
          onChange={e => setBookTitle(e.target.value)}
        />

        {/* Display Books  */}

        {
          loading ? <Center mt={20}>
            <Loader />
          </Center> : null
        }


        {
          !loading && books.length > 0 ?
            <SimpleGrid cols={2} mt={20}>
              {books.map(book => <BookComponent book={book} />)}
            </SimpleGrid>

            : null
        }

        {error.length > 0 && books.length < 1 && <Text>{error}</Text>}
      </Container>


    </>
  )
}
