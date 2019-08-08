<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use AppBundle\Entity\Products;
use AppBundle\Entity\Categories;

class ProductsController extends Controller {

    /**
     * @Route("/", name="products")
     * 
     */
    public function indexAction() {
        return $this->render('products/products.html.twig');
    }

    /**
     * @Route("/show", name="products_show", methods={"GET"}) 
     * 
     */
    public function showAction() {
         $em = $this->getDoctrine()->getManager();
          $dql = "SELECT p.id, p.code, p.name,p.description,p.brand, p.price,c.active from  AppBundle:Products p inner join AppBundle:Categories c WITH p.category=c.id  WHERE c.active=:active";
          $query = $em->createQuery($dql);
          $query->setParameter('active','1');

          $producscategory = $query->getResult();
        
        
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];

        $serializer = new Serializer($normalizers, $encoders);
        
        
        $jsonProducts = $serializer->serialize($producscategory, 'json');

        return new Response($jsonProducts);
    }

    /**
     * @Route("/showactivecategory", name="products_showcategory", methods={"GET"}) 
     * 
     */
    public function showcategoryactiveAction() {
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];

        $serializer = new Serializer($normalizers, $encoders);

        $em = $this->getDoctrine()->getManager();
        $dql = "select a from AppBundle:Categories a where a.active=:active";
        $query = $em->createQuery($dql);
        $query->setParameter('active', '1');

        $active = $query->getResult();

        //print_r($active);
        $jsoncategoryactive = $serializer->serialize($active, 'json');

        return new Response($jsoncategoryactive);
    }

    //

    /**
     * @Route("/registerproduct", name="products_register", methods={"POST"}) 
     * 
     */
    public function registerproducts(Request $request) {

        $code = $request->get("code");
        $name = $request->get('name');
        $em = $this->getDoctrine()->getManager();
        $dql = "select a from AppBundle:Products a where a.code=:code or a.name=:name";
        $query = $em->createQuery($dql);
        $query->setParameter('code', $code);
        $query->setParameter('name', $name);
        $serchcategori = $query->getResult();

        if (count($serchcategori) != "0") {
            return new Response("este codigo o nombre ya estan registrados ");
        } else {

            $description = $request->get('description');
            $brand = $request->get('brand');
            $category = $request->get('category');
            $price = $request->get('price');
            $Products = new Products();
            $Products->setCode($code);
            $Products->setName($name);
            $Products->setDescription($description);
            $Products->setBrand($brand);
            $Products->setCategory($category);
            $Products->setPrice($price);
            $em->persist($Products);
            $em->flush();
            return new Response("operacion exitosa");
        }
    }

    /**
     * @Route("/showupdate", name="products_listupdate", methods={"POST"}) 
     * 
     */
    public function listedit(Request $request) {
        $id = $request->get("id");

        $repository = $this->getDoctrine()
                ->getManager()
                ->getRepository('AppBundle:Products');

        $editproducts = $repository->findOneBy(array('id' => $id));

        //var_dump($editcategory);
        return $this->render('products/editproducts.html.twig', array("products" => $editproducts));
    }
         /**
     * @Route("/Updateproducts", name="products_update", methods={"POST"}) 
     * 
     */
    public function updateproduct( Request $request) {
        //var_dump($_POST);
        //die();
        $id = $request->get("id");
        $code = $request->get("code");
        $name = $request->get('name');
        $description = trim($request->get('description'));
        $brand = $request->get('brand');
       $price = $request->get('price');
        $em = $this->getDoctrine()->getManager();
        $Products = $em->getRepository('AppBundle:Products')->find($id);
        $Products->setCode($code);
        $Products->setName($name);
        $Products->setDescription($description);
        $Products->setBrand($brand);
        $Products->setPrice($price);

        $em->flush();
        return new Response("operacion exitosa");
    }
         /**
     * @Route("/deleteproducts", name="products_delete", methods={"POST"}) 
     * 
     */
        public function deletecategory(Request $request) {

        $id = $request->get("id");
        $em = $this->getDoctrine()->getManager();
        $Products = $em->getRepository('AppBundle:Products')->find($id);
        $em->remove($Products);
        $em->flush();
          return new Response("operacion exitosa");
    }
    
}
