import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import styles from '../../components/layout.module.css'
import Head from 'next/head'
import Link from 'next/link'


export default function Post({ postData }) {
  var urls="/posts/ssg-ssr";
  var href="ssg-ssr→";
  if(postData.id=="ssg-ssr"){
    urls="/posts/pre-rendering";
    href="pre-rendering→";
  }
    return (
      <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        {postData.title}
        <br />
        {postData.id}
        <br />
        {postData.date}
        <br />
        <Date dateString={postData.date} />
        
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href={urls}>{href}</Link>
        </div>
      </Layout>
    )
  }

export async function getStaticPaths() {
    const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}
export async function getStaticProps({ params }) {
    // Add the "await" keyword like this:
    const postData = await getPostData(params.id)
    return {
        props: {
          postData
        }
      }
    // ...
  }