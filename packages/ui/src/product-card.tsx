import styled from "styled-components";

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3px;
`;

const Card = styled.div`
  height: 300px;
  width: 100%;
  border-radius: var(--sm-radius);
  background-color: var(--bg-front);
  position: relative;
  overflow: hidden;
  box-shadow: var(--sm-shadow);
  border: 1px solid var(--bg-border);
`;

const Brand = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 100%;
  border: 3px solid var(--foreground);
  box-shadow: var(--sm-shadow);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5px;
  right: 8px;

  & > img {
    height: 20px;
    width: 20px;
    border-radius: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const Image = styled.div`
  height: 100%;
  width: 100%;
  background-color: var(--foreground);

  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const ContentBlur = styled.div`
  position: absolute;
  bottom: 0;
  height: 80px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  filter: blur(30px);
`;

const ContentWrapper = styled.div`
  position: absolute;
  bottom: 0;
  height: fit-content;
  width: 100%;
  background-color: transparent;
  padding: 5px 10px;
`;

const Name = styled.p`
  color: #ffffff;
  font-size: 13px;
  font-weight: var(--text-bold);
  text-shadow: var(--xl-shadow);
`;

const Category = styled.p`
  font-size: 9px;
  color: #ece7e7;
  text-shadow: var(--xl-shadow);
`;

const RateAndPriceWrapper = styled.div`
  margin-top: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Rating = styled.div`
  width: fit-content;
  padding: 2px 5px;
  background-color: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  font-size: 9px;
  border-radius: var(--lg-radius);
  box-shadow: var(--xl-shadow);
  color: #ffffff;
  font-weight: var(--text-bold);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

const Price = styled.div`
  width: fit-content;
  padding: 2px 5px;
  background-color: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  box-shadow: var(--xl-shadow);
  font-size: 12px;
  font-weight: var(--text-bold);
  border-radius: var(--lg-radius);
  color: #ffffff;

  & span {
    font-size: 8px;
  }
`;

interface DataType {
  brand: string;
  image_url: string;
  name: string;
  category: string;
  price: number;
}

export function ProductCard({
  brand,
  image_url,
  name,
  category,
  price,
}: DataType) {
  return (
    <CardWrapper>
      <Card>
        <Brand>
          <img src="../img/addidas-logo.png" alt={brand} />
        </Brand>
        <Image>
          <img src={image_url} alt={name} />
        </Image>
        <ContentBlur />
        <ContentWrapper>
          <Name>{name}</Name>
          <Category>{category}</Category>
          <RateAndPriceWrapper>
            <Rating>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                height="10"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd"
                />
              </svg>
              4.2
            </Rating>
            <Price>{price}</Price>
          </RateAndPriceWrapper>
        </ContentWrapper>
      </Card>
    </CardWrapper>
  );
}
