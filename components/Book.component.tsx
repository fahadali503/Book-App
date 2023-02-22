import { IBook } from "@/types/book.type";
import { Container, Flex, Group, Paper, SimpleGrid, Text, ThemeIcon, Title, createStyles } from "@mantine/core";
import { IconBook } from "@tabler/icons";
import { IconBook2 } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
    card: {
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'transform 150ms ease, box-shadow 100ms ease',
        padding: theme.spacing.xl,
        paddingLeft: theme.spacing.xl * 2,

        '&:hover': {
            boxShadow: theme.shadows.md,
            transform: 'scale(1.02)',
        },

        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 6,
            backgroundImage: theme.fn.linearGradient(0, theme.colors.pink[6], theme.colors.orange[6]),
        },
    },
}));


export default function BookComponent({ book }: { book: IBook }) {
    const { classes } = useStyles();
    return <Paper withBorder radius="md" className={classes.card}>
        <ThemeIcon
            size="xl"
            radius="md"
            variant="gradient"
            gradient={{ deg: 0, from: 'pink', to: 'orange' }}
        >
            <IconBook2 size={30} stroke={1.5} color="white" />
        </ThemeIcon>

        <Text mt={"md"} size="lg" weight={500}>
            {book.title}
        </Text>
        <Text size={"xs"}>
            Authors: <Text span px={3} color="dimmed">
                {book.author_name && book.author_name.slice(0, 5).join(", ")}
            </Text>
        </Text>
        <Text size={"sm"}>
            First Year Published: <Text color="dimmed" span>{book.first_publish_year}</Text>
        </Text>
        <Text size={"sm"}>
            ISBN: <Text span color="dimmed">
                {book.isbn && book.isbn.length > 0 && book.isbn.slice(0, 2).join(", ")}
            </Text>
        </Text>
        <Text size={"sm"}>
            Number of Pages: <Text span color="dimmed">
                {book.number_of_pages_median ?? 0}
            </Text>
        </Text>
    </Paper>
}
